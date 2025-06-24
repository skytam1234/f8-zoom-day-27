$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const textCode = $("#codeInput");
const preview = $(`.preview`);

textCode.addEventListener("input", (e) => {
    console.log(e.target.value);
    preview.srcDoc = `${e.target.value}`;
});
