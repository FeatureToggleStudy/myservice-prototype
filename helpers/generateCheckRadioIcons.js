const generateTooltip = require('./generateTooltip');
const replaceNonAlphanumeric = require('./replaceNonAlphanumeric');

module.exports = box => {
  let { modifiers, 
        text, 
        hint,
        toggle,
        rToggle,
        inject,
        type,
        value,
        baseID,
        boxID,
        icon,
        suppliedID,
        tooltip
       } = box;

  let generatedID = suppliedID ? boxID : `${baseID}-${boxID}`;

  if (tooltip) {
    tooltip = generateTooltip({
      content: tooltip.content,
      screenreaderText: tooltip.screenreaderText,
      id: generatedID,
      modifiers
    })
  }

  if (typeof icon === "object") {
    icon = `<i class="radio_icons__icon ${icon.weight ? icon.weight : 'fal'} ${icon.icon}"></i>` ;
  } else if (typeof icon === "string") {
    if (icon.includes("fa-")) {
      icon = `<i class="radio_icons__icon fal ${icon}"></i>`;
    } else {
      icon = `<img class="radio-icons__icon-img" src="${icon}" alt="${text} image">`
    }

  }

  let html =  `
  <div class="radio-icon">
    <input type="${type}" name="${baseID}" id="${generatedID}" class="radio-icon__control"
      value="${value ? value : replaceNonAlphanumeric(text)}"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers.includes("checked") ? "checked" : ""}
    >
    <label for="${generatedID}" class="radio-icon__label">
      ${icon}
      <span class="radio-icon__text">${text} ${tooltip ? tooltip : ""}</span>
    </label>
  </div>`

  return {
    html,
    toggle,
    rToggle,
    inject
  }

}