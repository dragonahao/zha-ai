// Google AI Studio (Gemini) 交互逻辑模块

// 在目标页面中执行的脚本
function executeScriptOnTabGemini(text) {
  console.log('[TEST] 脚本开始执行');

  console.log('[TEST] 当前 URL:', window.location.href);
  console.log('[TEST] document.readyState:', document.readyState);

  let injectionAttempted = false;
  let injectionInterval = null;
  let mutationObserver = null;

  function injectText() {
    if (injectionAttempted) return;

    console.log('[TEST] injectText 函数被调用');

    //const text = 'hello';
    console.log('[TEST] 准备输入:', text);

    const selectors = [
      'textarea[formcontrolname="promptText"]',
      'textarea',
      'div[contenteditable="true"]'
    ];

    let inputElement = null;
    for (const selector of selectors) {
      console.log('[TEST] 尝试选择器:', selector);
      const elements = document.querySelectorAll(selector);
      console.log('[TEST] 找到元素数量:', elements.length);

      for (const el of elements) {
        console.log('[TEST] 元素:', el.tagName, 'offsetParent:', el.offsetParent);
        if (el.offsetParent !== null) {
          inputElement = el;
          console.log('[TEST] 找到输入框:', inputElement);
          break;
        }
      }
      if (inputElement) break;
    }

    if (!inputElement) {
      console.log('[TEST] 未找到输入框，继续监听...');
      return false;
    }

    injectionAttempted = true;

    console.log('[TEST] 找到输入框，开始输入');

    inputElement.focus();
    console.log('[TEST] 输入框当前值:', inputElement.value || inputElement.textContent);

    if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
      inputElement.value = text;
    } else {
      inputElement.textContent = text;
    }

    console.log('[TEST] 输入框新值:', inputElement.value || inputElement.textContent);

    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);
    inputElement.dispatchEvent(changeEvent);

    console.log('[TEST] 已输入:', text);

    if (injectionInterval) {
      clearInterval(injectionInterval);
      injectionInterval = null;
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }

    function clickSubmitButton() {
      console.log('[TEST] 开始查找提交按钮');
      const submitSelector = '/html/body/app-root/ms-app/div/div/div[3]/div/span/ms-prompt-renderer/ms-chunk-editor/section/footer/ms-prompt-box/div[2]/div[2]/div[2]/ms-run-button/button';
      const submitButton = document.evaluate(submitSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      
      if (submitButton) {
        console.log('[TEST] 找到提交按钮:', submitButton);
        submitButton.click();
        console.log('[TEST] 已点击提交按钮');
      } else {
        console.log('[TEST] 未找到提交按钮');
      }
    }

    setTimeout(clickSubmitButton, 500);

    return true;
  }

  function startMutationObserver() {
    console.log('[TEST] 启动 MutationObserver 监听 DOM 变化');

    mutationObserver = new MutationObserver((mutations) => {
      console.log('[TEST] 检测到 DOM 变化，尝试注入');
      injectText();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function startPolling() {
    console.log('[TEST] 启动轮询机制');

    injectionInterval = setInterval(() => {
      console.log('[TEST] 轮询检查输入框...');
      injectText();
    }, 1000);
  }

  // 开始输入
  setTimeout(() => {
    startMutationObserver();
    startPolling();
  }, 0);
}

// 处理Google AI Studio按钮点击事件
async function handleClickGoogleAiGemini(analysisResult, selectedPrompt, addLogCallback) {
  try {
    const tabs = await chrome.tabs.query({ url: '*://aistudio.google.com/*' });

    if (tabs.length > 0) {
      const targetTab = tabs[0];

      // 可以先操作 executeScript /再 update
      let message = selectedPrompt;
      if (analysisResult) {
        message = JSON.stringify(analysisResult, null, 2) + '\n\n' + selectedPrompt;
      }
      
      let result = await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        func: executeScriptOnTabGemini,
        args: [message] // 传递给 func 的参数
      });
      
      if (addLogCallback) {
        addLogCallback("---- result " + JSON.stringify(result));
      }

      await chrome.tabs.update(targetTab.id, { active: true });
      await chrome.windows.update(targetTab.windowId, { focused: true });
      console.log("已跳转到 Google AI Studio 窗口 B", targetTab);
    } else {
      const newTab = await chrome.tabs.create({ url: 'https://aistudio.google.com/prompts/new_chat' });
      if (addLogCallback) {
        addLogCallback('已打开 Google AI Studio', 'success');
      }
    }
  } catch (error) {
    if (addLogCallback) {
      addLogCallback('打开 Google AI Studio 失败: ' + error.message, 'error');
    }
  }
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleClickGoogleAiGemini,
    executeScriptOnTabGemini
  };
} else {
  // 浏览器环境，将函数添加到全局作用域
  window.GeminiExecutor = {
    handleClickGoogleAiGemini,
    executeScriptOnTabGemini
  };
}