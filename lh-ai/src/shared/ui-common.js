// 共享的UI逻辑模块
document.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scanButton');
  const exportButton = document.getElementById('exportButton');
  const logContainer = document.getElementById('logContainer');
  const progressContainer = document.getElementById('progressContainer');
  const progressText = document.getElementById('progressText');
  const progressPercent = document.getElementById('progressPercent');
  const progressFill = document.getElementById('progressFill');
  const promptSelect = document.getElementById('promptSelect');
  const llmSelect = document.getElementById('llmSelect');

  let analysisResult = null;
  let selectedPrompt = 'Taro+less';
  let selectedLlm = 'Gemini';

  // 加载保存的设置
  chrome.storage.local.get(['selectedPrompt', 'selectedLlm'], (result) => {
    // 先渲染选项列表
    if (window.PromptSelectOptions) {
      window.PromptSelectOptions.renderPromptOptions('promptSelect');
    }
    if (window.LlmSelectOptions) {
      window.LlmSelectOptions.renderLlmOptions('llmSelect');
    }

    // 然后设置保存的值
    if (result.selectedPrompt) {
      selectedPrompt = result.selectedPrompt;
      promptSelect.value = selectedPrompt;
    }
    if (result.selectedLlm) {
      selectedLlm = result.selectedLlm;
      llmSelect.value = selectedLlm;
      document.body.setAttribute('data-llm', selectedLlm);
    }
  });

  promptSelect.addEventListener('change', () => {
    selectedPrompt = promptSelect.value;
    chrome.storage.local.set({ selectedPrompt });
  });

  llmSelect.addEventListener('change', () => {
    selectedLlm = llmSelect.value;
    chrome.storage.local.set({ selectedLlm });
    document.body.setAttribute('data-llm', selectedLlm);
    addLog(`已切换到 ${selectedLlm} 模型`, 'info');
  });

  function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    progressText.textContent = `正在分析第 ${current}/${total} 个元素`;
    progressPercent.textContent = percent + '%';
    progressFill.style.width = percent + '%';
  }

  function addLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    entry.innerHTML = `<span class="timestamp">[${timestamp}]</span>${message}`;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'progress') {
      updateProgress(message.current, message.total);
      return;
    }

    if (message.action === 'result') {
      if (message.data.error) {
        addLog('分析失败: ' + message.data.error, 'error');
      } else {
        analysisResult = message.data;
        chrome.storage.local.set({ analysisResult: message.data });
        addLog('分析完成！共分析 ' + analysisResult.analyzedElements + ' 个元素', 'success');
        exportButton.disabled = false;
        progressContainer.style.display = 'none';

        scanButton.disabled = false;
        scanButton.textContent = '开始扫描分析';

        exportJSON(false);
      }
    }
  });

  async function startScan() {
    scanButton.disabled = true;
    scanButton.textContent = '扫描中...';
    logContainer.innerHTML = '';
    exportButton.disabled = true;
    analysisResult = null;
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = '准备开始分析...';
    progressPercent.textContent = '0%';

    addLog('开始扫描分析页面...', 'info');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      addLog('正在分析页面...', 'info');

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content/analyzer.js']
      });

    } catch (error) {
      addLog('错误: ' + error.message, 'error');
      scanButton.disabled = false;
      scanButton.textContent = '开始扫描分析';
    }
  }

  async function exportJSON(shouldDownload) {
    if (!analysisResult) return;

    if (shouldDownload) {

      // 利用Annotation 来处理一次 analysisResult
      let results = []
      for (item of analysisResult["results"]) {
        let annotation = new window.Annotation()
        annotation.parse(parseInt(item["dataIndex"]), item["annotations"])
        results.push(annotation)
      }

      // const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
      const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      try {
        // 直接使用传统下载方式，在扩展弹出窗口中更可靠
        const a = document.createElement('a');
        a.href = url;
        a.download = `lanhu-analysis-${timestamp}.json`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        addLog('JSON 文件已导出', 'success');
      } catch (error) {
        addLog('导出失败: ' + error.message, 'error');
      } finally {
        // 释放URL对象
        URL.revokeObjectURL(url);
      }
    } else {
      // 交给AI
      setTimeout(() => {
        googleAiButton.click();
      }, 500);
    }
  }

  scanButton.addEventListener('click', startScan);
  exportButton.addEventListener('click', async () => {
    exportJSON(true);
  });

  // AI按钮点击事件
  async function handleAiClick() {
    // 根据选择的LLM模型调用不同的执行器
    // 利用Annotation 来处理一次 analysisResult
      let results = []
      for (item of analysisResult["results"]) {
        let annotation = new window.Annotation()
        annotation.parse(parseInt(item["dataIndex"]), item["annotations"])
        results.push(annotation)
      }
      
    if (selectedLlm === 'Gemini') {
      await window.GeminiExecutor.handleClickGoogleAiGemini(results, selectedPrompt, addLog);
    } else if (selectedLlm === 'DeepSeek') {
      await window.DeepSeekExecutor.handleClickDeepSeek(results, selectedPrompt, addLog);
    } else if (selectedLlm === 'DouBao') {
      await window.DouBaoExecutor.handleClickDouBao(results, selectedPrompt, addLog); 
    } else if (selectedLlm === 'Claude') {
      await window.ClaudeExecutor.handleClickClaude(results, selectedPrompt, addLog);
    } else {
      addLog(`未知的LLM模型: ${selectedLlm}`, 'error');
    }
  }

  const googleAiButton = document.getElementById('googleAiButton');
  googleAiButton.addEventListener('click', handleAiClick);
});