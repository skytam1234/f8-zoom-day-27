$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const textCode = $("#codePlace");
const preview = $(`.preview`);
const contextMenu = $(".contextMenu");
const btnDelete = contextMenu.querySelector(".btn-delete");

const maxX = textCode.clientLeft + textCode.offsetWidth;
const maxY = textCode.clientTop + textCode.offsetHeight;
const maxX1 = preview.clientLeft + preview.offsetWidth;
const maxY1 = preview.clientTop + preview.offsetHeight;

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
  const currentMaxX = e.clientX + contextMenu.offsetWidth;
  const currentMaxY = e.clientY + contextMenu.offsetHeight;
  contextMenu.style.left = e.clientX + "px";
  contextMenu.style.top = e.clientY + "px";
  console.log(e.clientX);
  if (currentMaxX > maxX || currentMaxX > maxX1) {
    contextMenu.style.left = e.clientX - contextMenu.offsetWidth + "px";
  }
  if (currentMaxY > maxY || currentMaxY > maxY1) {
    contextMenu.style.top = e.clientY - contextMenu.offsetHeight + "px";
  }
  if (e.clientX > maxX) {
    contextMenu.style.left = e.clientX + "px";
  }
  contextMenu.classList.add("show");
});
document.addEventListener("mousedown", (e) => {
  contextMenu.classList.remove("show");
});
btnDelete.addEventListener("click", function () {
  textCode.value = "";
  preview.srcdoc = "";
});
