// DouBao 交互逻辑模块

// 在目标页面中执行的脚本
function executeScriptOnTabDouBao(text) {
  console.log('[DouBao] 脚本开始执行');

  console.log('[DouBao] 当前 URL:', window.location.href);
  console.log('[DouBao] document.readyState:', document.readyState);

  let injectionAttempted = false;
  let injectionInterval = null;
  let mutationObserver = null;

  function injectText() {
    if (injectionAttempted) return;

    console.log('[DouBao] injectText 函数被调用');
    console.log('[DouBao] 准备输入:', text);

    // DouBao的输入框选择器
    const selectors = [
      'textarea[placeholder*="请输入"]',
      'textarea[data-testid]',
      'textarea',
      'div[contenteditable="true"]',
      '[contenteditable="true"]'
    ];

    let inputElement = null;
    for (const selector of selectors) {
      console.log('[DouBao] 尝试选择器:', selector);
      const elements = document.querySelectorAll(selector);
      console.log('[DouBao] 找到元素数量:', elements.length);

      for (const el of elements) {
        console.log('[DouBao] 元素:', el.tagName, 'offsetParent:', el.offsetParent);
        // 检查元素是否可见且可交互
        if (el.offsetParent !== null && 
            (el.tagName === 'TEXTAREA' || 
             el.tagName === 'INPUT' || 
             el.contentEditable === 'true' || 
             el.getAttribute('contenteditable') === 'true')) {
          inputElement = el;
          console.log('[DouBao] 找到输入框:', inputElement);
          break;
        }
      }
      if (inputElement) break;
    }

    if (!inputElement) {
      console.log('[DouBao] 未找到输入框，继续监听...');
      return false;
    }

    injectionAttempted = true;

    console.log('[DouBao] 找到输入框，开始输入');

    inputElement.focus();
    console.log('[DouBao] 输入框当前值:', inputElement.value || inputElement.textContent);

    // 根据元素类型设置值
    if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
      inputElement.value = text;
      // 触发输入事件
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // 对于contenteditable元素
      inputElement.textContent = text;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    console.log('[DouBao] 输入框新值:', inputElement.value || inputElement.textContent);

    if (injectionInterval) {
      clearInterval(injectionInterval);
      injectionInterval = null;
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }

    // 查找并点击提交按钮
    function clickSubmitButton() {
      console.log('[DouBao] 开始查找提交按钮');
      
      // DouBao的提交按钮选择器
      const submitSelectors = [
        'button[type="submit"]',
        'button[data-testid="send-button"]',
        'button:contains("发送")',
        'button:contains("Send")',
        '.send-button',
        '.submit-button',
        'button[aria-label*="发送"]',
        'button[aria-label*="send"]'
      ];

      let submitButton = null;
      for (const selector of submitSelectors) {
        if (selector.includes(':contains')) {
          // 处理包含文本的选择器
          const text = selector.match(/:contains\("([^"]+)"\)/)[1];
          const buttons = document.querySelectorAll(selector.replace(/:contains\([^)]+\)/, ''));
          for (const btn of buttons) {
            if (btn.textContent.includes(text) || btn.innerText.includes(text)) {
              submitButton = btn;
              break;
            }
          }
        } else {
          submitButton = document.querySelector(selector);
        }
        if (submitButton) break;
      }

      // 如果上述选择器都找不到，尝试通过XPath查找
      if (!submitButton) {
        const xpathExpressions = [
          "//button[contains(., '发送')]",
          "//button[contains(., 'Send')]",
          "//button[contains(@class, 'send')]",
          "//button[contains(@class, 'submit')]"
        ];
        
        for (const xpath of xpathExpressions) {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          submitButton = result.singleNodeValue;
          if (submitButton) break;
        }
      }
      
      if (submitButton) {
        console.log('[DouBao] 找到提交按钮:', submitButton);
        submitButton.click();
        console.log('[DouBao] 已点击提交按钮');
      } else {
        console.log('[DouBao] 未找到提交按钮，尝试按Enter键');
        // 如果找不到按钮，尝试在输入框中按Enter键
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        });
        inputElement.dispatchEvent(enterEvent);
      }
    }

    setTimeout(clickSubmitButton, 500);

    return true;
  }

  function startMutationObserver() {
    console.log('[DouBao] 启动 MutationObserver 监听 DOM 变化');

    mutationObserver = new MutationObserver((mutations) => {
      console.log('[DouBao] 检测到 DOM 变化，尝试注入');
      injectText();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function startPolling() {
    console.log('[DouBao] 启动轮询机制');

    injectionInterval = setInterval(() => {
      console.log('[DouBao] 轮询检查输入框...');
      injectText();
    }, 1000);
  }

  // 开始输入
  setTimeout(() => {
    startMutationObserver();
    startPolling();
  }, 0);
}

// 处理DouBao按钮点击事件
async function handleClickDouBao(analysisResult, selectedPrompt, addLogCallback) {
  try {
    const tabs = await chrome.tabs.query({ url: '*://www.doubao.com/*' });

    if (tabs.length > 0) {
      const targetTab = tabs[0];

      // 可以先操作 executeScript /再 update
      let message = selectedPrompt;
      if (analysisResult) {
        message = JSON.stringify(analysisResult, null, 2) + '\n\n' + selectedPrompt;
      }
      
      // 读取ai-ds-db.md文件内容并追加到消息
      try {
        const response = await fetch(chrome.runtime.getURL('documents/ai-ds-db.md'));
        const dsContent = await response.text();
        message += '\n\n' + dsContent;
      } catch (error) {
        console.error('无法读取ai-ds-db.md文件:', error);
        if (addLogCallback) {
          addLogCallback('读取设计规范文件失败: ' + error.message, 'error');
        }
      }
      
      let result = await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        func: executeScriptOnTabDouBao,
        args: [message] // 传递给 func 的参数
      });
      
      if (addLogCallback) {
        addLogCallback("---- DouBao result " + JSON.stringify(result));
      }

      await chrome.tabs.update(targetTab.id, { active: true });
      await chrome.windows.update(targetTab.windowId, { focused: true });
      console.log("已跳转到 DouBao 窗口", targetTab);
    } else {
      const newTab = await chrome.tabs.create({ url: 'https://www.doubao.com/chat' });
      if (addLogCallback) {
        addLogCallback('已打开 DouBao', 'success');
      }
    }
  } catch (error) {
    if (addLogCallback) {
      addLogCallback('打开 DouBao 失败: ' + error.message, 'error');
    }
  }
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleClickDouBao,
    executeScriptOnTabDouBao
  };
} else {
  // 浏览器环境，将函数添加到全局作用域
  window.DouBaoExecutor = {
    handleClickDouBao,
    executeScriptOnTabDouBao
  };
}