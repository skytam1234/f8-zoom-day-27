$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const textCode = $("#codePlace");
const preview = $(`.preview`);
const contextMenu = $(".contextMenu");
const previewOverlay = $(`.preview-overlay`);
const btnDelete = contextMenu.querySelector(".btn-delete");

const maxX = textCode.clientLeft + textCode.offsetWidth;
const maxY = textCode.clientTop + textCode.offsetHeight;
const maxX1 = maxX + 6 + previewOverlay.offsetWidth;
const minX1 = maxX + 6;
const maxY1 = previewOverlay.clientTop + previewOverlay.offsetHeight;
const minY1 = previewOverlay.clientTop;

textCode.addEventListener("input", (e) => {
  preview.srcdoc = e.target.value;
});
window.addEventListener("beforeunload", (e) => {
  if (textCode.value.trim().length > 0) {
    e.returnValue = "Bạn chưa lưu dữ liệu, bạn có muốn thoát không?";
  }
});
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.returnValue = "";
});
textCode.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.log(e.clientX);
  const currentMaxX = e.clientX + contextMenu.offsetWidth;
  const currentMaxY = e.clientY + contextMenu.offsetHeight;
  currentMaxX > maxX
    ? (contextMenu.style.left = e.clientX - contextMenu.offsetWidth - 10 + "px")
    : (contextMenu.style.left = e.clientX + "px");
  currentMaxY > maxY
    ? (contextMenu.style.top = e.clientY - contextMenu.offsetHeight - 10 + "px")
    : (contextMenu.style.top = e.clientY + "px");

  if (e.clientX > maxX) {
    contextMenu.style.left = e.clientX + "px";
  }
  contextMenu.classList.add("show");
});
previewOverlay.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const currentMaxX = e.clientX + contextMenu.offsetWidth;
  const currentMaxY = e.clientY + contextMenu.offsetHeight;
  contextMenu.style.left = e.clientX + "px";
  contextMenu.style.top = e.clientY + "px";
  currentMaxX > maxX1
    ? (contextMenu.style.left = e.clientX - contextMenu.offsetWidth - 10 + "px")
    : (contextMenu.style.left = e.clientX + "px");
  currentMaxY > maxY1
    ? (contextMenu.style.top = e.clientY - contextMenu.offsetHeight - 10 + "px")
    : (contextMenu.style.top = e.clientY + "px");

  contextMenu.classList.add("show");
});

document.addEventListener("mousedown", (e) => {
  contextMenu.classList.remove("show");
});
btnDelete.addEventListener("click", function () {
  textCode.value = "";
  preview.srcdoc = "";
});
