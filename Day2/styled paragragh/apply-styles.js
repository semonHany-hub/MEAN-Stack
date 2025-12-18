let paragraph = document.getElementsByTagName("p")[0];
console.log(document.querySelectorAll(`input[name=fontFamily]`));

function eventAdding(name) {
  document.querySelectorAll(`input[name=${name}]`).forEach((elem) =>
    elem.addEventListener("click", (e) => {
      console.log(elem, e.currentTarget.value);
      paragraph.style[name] = e.currentTarget.value;
    })
  );
}

eventAdding("fontFamily");
eventAdding("textAlign");
eventAdding("lineHeight");
eventAdding("letterSpacing");
eventAdding("textIndent");
eventAdding("textTransform");
eventAdding("textDecoration");
eventAdding("borderColor");
