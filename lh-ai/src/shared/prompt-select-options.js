// 提示词选项配置
const promptOptions = [
  { value: 'Taro+less', text: 'Taro+less' },
  { value: 'React+less', text: 'React+less' },
  { value: 'Flutter', text: 'Flutter' },
  { value: 'Composable', text: 'Composable' }
];

// 渲染提示词选项到指定选择框
function renderPromptOptions(selectElementId) {
  const selectElement = document.getElementById(selectElementId);
  if (!selectElement) {
    console.error(`找不到元素: ${selectElementId}`);
    return;
  }

  // 清空现有选项
  selectElement.innerHTML = '';

  // 添加新选项
  promptOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    promptOptions,
    renderPromptOptions
  };
} else {
  // 浏览器环境，将函数添加到全局作用域
  window.PromptSelectOptions = {
    promptOptions,
    renderPromptOptions
  };
}