// Claude AI 交互逻辑模块

// 在目标页面中执行的脚本
function executeScriptOnTabClaude(text) {
  console.log('[Claude] 脚本开始执行');

  console.log('[Claude] 当前 URL:', window.location.href);
  console.log('[Claude] document.readyState:', document.readyState);

  let injectionAttempted = false;
  let injectionInterval = null;
  let mutationObserver = null;

  function injectText() {
    if (injectionAttempted) return;

    console.log('[Claude] injectText 函数被调用');
    console.log('[Claude] 准备输入:', text);

    // Claude的输入框选择器
    const selectors = [
      'div[contenteditable="true"]',
      'textarea',
      'div[data-testid]',
      '.ProseMirror',
      '[data-testid="chat-input"]'
    ];

    let inputElement = null;
    for (const selector of selectors) {
      console.log('[Claude] 尝试选择器:', selector);
      const elements = document.querySelectorAll(selector);
      console.log('[Claude] 找到元素数量:', elements.length);

      for (const el of elements) {
        console.log('[Claude] 元素:', el.tagName, 'offsetParent:', el.offsetParent);
        // 检查元素是否可见且可交互
        if (el.offsetParent !== null && 
            (el.tagName === 'TEXTAREA' || 
             el.tagName === 'INPUT' || 
             el.contentEditable === 'true' || 
             el.getAttribute('contenteditable') === 'true')) {
          inputElement = el;
          console.log('[Claude] 找到输入框:', inputElement);
          break;
        }
      }
      if (inputElement) break;
    }

    if (!inputElement) {
      console.log('[Claude] 未找到输入框，继续监听...');
      return false;
    }

    injectionAttempted = true;

    console.log('[Claude] 找到输入框，开始输入');

    inputElement.focus();
    console.log('[Claude] 输入框当前值:', inputElement.value || inputElement.textContent);

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

    console.log('[Claude] 输入框新值:', inputElement.value || inputElement.textContent);

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
      console.log('[Claude] 开始查找提交按钮');
      
      // Claude的提交按钮选择器
      const submitSelectors = [
        'button[type="submit"]',
        'button[aria-label*="发送"]',
        'button[aria-label*="Send"]',
        'button[aria-label*="提交"]',
        'button[aria-label*="Submit"]',
        'button[data-testid="send-button"]',
        'button:contains("发送")',
        'button:contains("Send")',
        '.send-button',
        '.submit-button',
        'svg[class*="send"]',
        'button[class*="send"]'
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
          "//button[contains(@class, 'submit')]",
          "//button[contains(@aria-label, '发送')]",
          "//button[contains(@aria-label, 'Send')]"
        ];
        
        for (const xpath of xpathExpressions) {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          submitButton = result.singleNodeValue;
          if (submitButton) break;
        }
      }
      
      if (submitButton) {
        console.log('[Claude] 找到提交按钮:', submitButton);
        submitButton.click();
        console.log('[Claude] 已点击提交按钮');
      } else {
        console.log('[Claude] 未找到提交按钮，尝试按Enter键');
        // 如果找不到按钮，尝试在输入框中按Enter键
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
          shiftKey: true // Claude可能需要Shift+Enter发送
        });
        inputElement.dispatchEvent(enterEvent);
      }
    }

    setTimeout(clickSubmitButton, 500);

    return true;
  }

  function startMutationObserver() {
    console.log('[Claude] 启动 MutationObserver 监听 DOM 变化');

    mutationObserver = new MutationObserver((mutations) => {
      console.log('[Claude] 检测到 DOM 变化，尝试注入');
      injectText();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function startPolling() {
    console.log('[Claude] 启动轮询机制');

    injectionInterval = setInterval(() => {
      console.log('[Claude] 轮询检查输入框...');
      injectText();
    }, 1000);
  }

  // 开始输入
  setTimeout(() => {
    startMutationObserver();
    startPolling();
  }, 0);
}

// 处理Claude按钮点击事件
async function handleClickClaude(analysisResult, selectedPrompt, addLogCallback) {
  try {
    const tabs = await chrome.tabs.query({ url: '*://claude.ai/*' });

    if (tabs.length > 0) {
      const targetTab = tabs[0];

      // 可以先操作 executeScript /再 update
      let message = selectedPrompt;
      if (analysisResult) {
        message = JSON.stringify(analysisResult, null, 2) + '\n\n' + selectedPrompt;
      }
      
      let result = await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        func: executeScriptOnTabClaude,
        args: [message] // 传递给 func 的参数
      });
      
      if (addLogCallback) {
        addLogCallback("---- Claude result " + JSON.stringify(result));
      }

      await chrome.tabs.update(targetTab.id, { active: true });
      await chrome.windows.update(targetTab.windowId, { focused: true });
      console.log("已跳转到 Claude 窗口", targetTab);
    } else {
      const newTab = await chrome.tabs.create({ url: 'https://claude.ai/new' });
      if (addLogCallback) {
        addLogCallback('已打开 Claude', 'success');
      }
    }
  } catch (error) {
    if (addLogCallback) {
      addLogCallback('打开 Claude 失败: ' + error.message, 'error');
    }
  }
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleClickClaude,
    executeScriptOnTabClaude
  };
} else {
  // 浏览器环境，将函数添加到全局作用域
  window.ClaudeExecutor = {
    handleClickClaude,
    executeScriptOnTabClaude
  };
}