(function () {
  if (window._lanhuAnalyzerInitialized) return;
  window._lanhuAnalyzerInitialized = true;
  window._lanhuFontFamily = false;
  // 辅助函数：智能获取文本，处理可见性及换行符
  function getSmartText(element) {
    if (!element) return "";
    // innerText 会根据布局返回文本，能自然处理 <br>，但隐藏元素会返回空。
    const text = element.innerText;
    if (text !== undefined && text !== "" && element.style.display !== "none") {
      return text.trim();
    }
    // 对于隐藏元素（如颜色格式下拉框），手动替换 <br> 并在 textContent 基础上降级
    const html = element.innerHTML || "";
    const temp = document.createElement("div");
    temp.innerHTML = html.replace(/<br\s*\/?>/gi, "\n");
    return temp.textContent.trim();
  }

  const activationArea = document.evaluate(
    '//*[@id="detail_container"]/div[2]/div[2]/div[1]/div[3]/div[1]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;

  if (!activationArea) {
    chrome.runtime.sendMessage({
      action: "result",
      data: { error: "No activation area found" },
    });
    return;
  }

  const allElements = activationArea.querySelectorAll(
    ".layers_item.layers_type1[data-index]",
  );

  const analysisResults = [];

  function analyzeNext(index) {
    if (index >= allElements.length) {
      window._lanhuAnalyzerInitialized = false;
      chrome.runtime.sendMessage({
        action: "result",
        data: {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          totalElements: allElements.length,
          analyzedElements: analysisResults.length,
          results: analysisResults,
        },
      });
      return;
    }

    const layerItem = allElements[index];
    const dataIndex = layerItem.getAttribute("data-index");

    chrome.runtime.sendMessage({
      action: "progress",
      current: index + 1,
      total: allElements.length,
    });

    const rect = layerItem.getBoundingClientRect();
    const clientX = rect.left + rect.width / 2;
    const clientY = rect.top + rect.height / 2;

    const mousedown = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: clientX,
      clientY: clientY,
    });
    layerItem.dispatchEvent(mousedown);

    const mouseup = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: clientX,
      clientY: clientY,
    });
    layerItem.dispatchEvent(mouseup);

    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: clientX,
      clientY: clientY,
    });
    layerItem.dispatchEvent(click);

    layerItem.focus();

    setTimeout(function () {
      const container = document.querySelector(".annotation_container");
      const innerHTML = container ? container.innerHTML : "";
      const annotations = [];

      if (container) {
        const annotationItems = container.querySelectorAll(".annotation_item");
        annotationItems.forEach((item) => {
          const ann = {
            subtitle: "",
            properties: {},
            colors: [],
            code: "",
          };

          // Subtitle
          const subtitleEl = item.querySelector(".subtitle");
          if (subtitleEl) {
            ann.subtitle = getSmartText(subtitleEl)
              .replace("复制代码", "")
              .trim();
          } else {
            // 对于切图等类型的标注，标题可能在 title_name 元素中
            const titleNameEl = item.querySelector(".title_name");
            if (titleNameEl) {
              ann.subtitle = getSmartText(titleNameEl)
                .replace("复制代码", "")
                .trim();
            }
          }

          // Code
          const codeEl = item.querySelector(".language-css, code");
          if (codeEl) {
            let codeValue = codeEl.textContent.trim();
            if (window._lanhuFontFamily == false) {
              // 不要font-family属性
              codeValue = codeValue.replace(/font-family([^;]*);/g, "").trim();
            }
            ann.code = codeValue;
          }

          // Colors
          const colorElements = item.querySelectorAll(".color_li, .color_list");
          colorElements.forEach((colorEl) => {
            if (colorEl.classList.contains("color_list")) {
              let ancestor = colorEl.parentElement;
              let hasColorLiAncestor = false;
              while (ancestor && ancestor !== item) {
                if (ancestor.classList.contains("color_li")) {
                  hasColorLiAncestor = true;
                  break;
                }
                ancestor = ancestor.parentElement;
              }
              if (hasColorLiAncestor) return;
            }

            const colorObj = {
              background: "",
              values: [],
            };
            const colorPatch = colorEl.querySelector(".color");
            if (colorPatch) {
              colorObj.background = `background: ${colorPatch.style.background};`;
            }
            const copyTexts = colorEl.querySelectorAll(
              ".copy_text:not(.mu-radio-label)",
            );
            copyTexts.forEach((ct) => {
              const text = ct.textContent.trim();
              if (
                text &&
                !["HEX", "AHEX", "HEXA", "RGBA", "HSLA"].includes(text)
              ) {
                colorObj.values.push(text);
              }
            });

            if (colorObj.background || colorObj.values.length > 0) {
              ann.colors.push(colorObj);
            }
          });

          // Properties
          let currentTitle = null;
          const allElements = item.querySelectorAll("*");
          allElements.forEach((el) => {
            const classes = el.classList;
            if (
              classes.contains("item_title") ||
              classes.contains("title_name")
            ) {
              currentTitle = getSmartText(el);
            } else if (
              classes.contains("color_list") ||
              classes.contains("layer_color")
            ) {
              // 遇到颜色列表或颜色标记区域，将当前标题改为“颜色”或重置
              currentTitle = "颜色";
            } else if (currentTitle) {
              const targetClasses = [
                "layer_name",
                "two",
                "item_one",
                "copy_text",
                "slice_name",
                "align_text",
                "item_content",
                "item_two",
              ];
              if (targetClasses.some((c) => classes.contains(c))) {
                // 避免重复捕获：如果祖先已经包含目标类，则跳过
                let ancestor = el.parentElement;
                let hasTargetAncestor = false;
                while (ancestor && ancestor !== item) {
                  if (
                    targetClasses.some((c) => ancestor.classList.contains(c))
                  ) {
                    hasTargetAncestor = true;
                    break;
                  }
                  ancestor = ancestor.parentElement;
                }
                if (hasTargetAncestor) return;

                // 确保不在 color 或 code 区域内重复捕获
                if (
                  !item.querySelector(".layer_color")?.contains(el) &&
                  !item.querySelector(".code_box")?.contains(el)
                ) {
                  const text = getSmartText(el);
                  if (
                    text &&
                    ![
                      "复制代码",
                      "HEX",
                      "AHEX",
                      "HEXA",
                      "RGBA",
                      "HSLA",
                    ].includes(text)
                  ) {
                    if (!ann.properties[currentTitle]) {
                      ann.properties[currentTitle] = [];
                    }
                    if (!ann.properties[currentTitle].includes(text)) {
                      ann.properties[currentTitle].push(text);
                    }
                  }
                }
              }
            }
          });

          // 清理属性：合并数组并处理特殊字段
          for (let key in ann.properties) {
            const values = ann.properties[key];
            if (key === "空间") {
              // 特殊处理"空间"字段：将其转换为 {value, desc} 对象
              let combined = values.join("\n");
              let parts = combined
                .split("\n")
                .map((p) => p.trim())
                .filter((p) => p);
              let val = parts[0] || "";
              let desc = "";
              if (parts.length > 1) {
                // 如果有多个部分，尝试提取描述（如"字间距 0px" -> "字间距"）
                desc = parts.slice(1).join(" ");
                if (val && desc.includes(val)) {
                  desc = desc.replace(val, "").trim();
                }
              }
              ann.properties[key] = { value: val, desc: desc };
            } else if (values.length > 1) {
              // 关键逻辑：对"字体"等复杂属性使用换行，避免揉在一起
              const isSimpleProperty = ["位置", "大小", "圆角"].includes(key);
              const hasComplexValue = values.some(
                (v) => v.includes(" ") || /[\u4e00-\u9fa5]/.test(v),
              );
              if (hasComplexValue && !isSimpleProperty) {
                ann.properties[key] = values.join("\n").trim();
              } else {
                ann.properties[key] = values.join(" ").trim();
              }

              // 单独处理位置
              let annotationPosition = ann.properties["位置"];
              if (annotationPosition) {
                let posValues = [];
                if (Array.isArray(annotationPosition)) {
                  posValues = annotationPosition;
                } else {
                  posValues = annotationPosition.split(" ");
                }
                posValues = posValues.map((v) => v.trim());

                let position = { x: "0px", y: "0px" };
                if (posValues.length == 1) {
                  position = { x: posValues[0], y: posValues[0] };
                } else if (posValues.length == 2) {
                  position = { x: posValues[0], y: posValues[1] };
                }
                ann.position = position;
              }
              // 单独处理大小
              let annotationSize = ann.properties["大小"];
              if (annotationSize) {
                let sizeValues = [];
                if (Array.isArray(annotationSize)) {
                  sizeValues = annotationSize;
                } else {
                  sizeValues = annotationSize.split(" ");
                }
                sizeValues = sizeValues.map((v) => v.trim());
                let size = { width: "0px", height: "0px" };
                if (sizeValues.length == 1) {
                  size = { width: sizeValues[0], height: sizeValues[0] };
                } else if (sizeValues.length == 2) {
                  size = { width: sizeValues[0], height: sizeValues[1] };
                }
                ann.size = size;
              }
            } else if (values.length === 1) {
              ann.properties[key] = values[0].trim();
            }

            if (ann.properties["字体"] && window._lanhuFontFamily == false) {
              delete ann.properties["字体"];
            }
          }

          if (
            ann.subtitle ||
            Object.keys(ann.properties).length > 0 ||
            ann.colors.length > 0 ||
            ann.code
          ) {
            annotations.push(ann);
          }
        });
      }

      // 尝试为 annotations定义一个类型
      if (annotations.length >= 2) {
        let annotationFirst = annotations[0];
        let annotationItem = annotations[1];
        let subtitle = annotationItem.subtitle;
        if (subtitle == "切图") {
          annotationFirst.type = "image";
        } else if (subtitle == "文本") {
          if (annotations.length > 4) {
            annotationFirst.type = "richtext";
          } else {
            annotationFirst.type = "text";
          }
        } else {
          annotationFirst.type = "container";
        }
      }

      analysisResults.push({
        index: index + 1,
        dataIndex: dataIndex,
        annotations: annotations,
        // innerHTML: innerHTML
      });

      analyzeNext(index + 1);
    }, 8);
  }

  analyzeNext(0);
})();
