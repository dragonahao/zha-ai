// LLM模型选项配置
const llmOptions = [
  { value: 'Gemini', text: 'Gemini' },
  { value: 'DeepSeek', text: 'DeepSeek' },
  { value: 'DouBao', text: 'DouBao' },
  { value: 'Claude', text: 'Claude' }
];

// 渲染LLM选项到指定选择框
function renderLlmOptions(selectElementId) {
  const selectElement = document.getElementById(selectElementId);
  if (!selectElement) {
    console.error(`找不到元素: ${selectElementId}`);
    return;
  }

  // 清空现有选项
  selectElement.innerHTML = '';

  // 添加新选项
  llmOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    llmOptions,
    renderLlmOptions
  };
} else {
  // 浏览器环境，将函数添加到全局作用域
  window.LlmSelectOptions = {
    llmOptions,
    renderLlmOptions
  };
}