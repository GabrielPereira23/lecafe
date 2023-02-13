const DOM = {
  list: document.querySelector(".interactive-content"),
  sectionButtons: document.querySelectorAll(".interactive-selector > button"),
  render(items) {
    this.list.innerHTML = '';
    items.forEach((item) => {
      this.list.appendChild(DomElementBuilder.item(item.name, item.description));
    });
  },
  toggleParagraph: function (element) {
    element.classList.toggle('j-active');
  }
};

const DomElementBuilder = {
  img: function (src, className, width, height, alt) {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add(className);
    img.alt = alt;
    img.width = width;
    img.height = height;
    return img;
  }, 
  item: function (title, description) {
    // <img> 
    let imgDecoration = this.img("img/svg/decorator-brown.svg", "interactive-decorator", 12, 12, "Decorador");
    // <h2> 
    let h2 = document.createElement("h2");
    h2.classList.add("t2-m", "b5");
    h2.innerText = title;
    // <p>
    let p = document.createElement("p");
    p.classList.add("t2-s", "b6");
    p.innerText = description;
    // <img>
    let imgArrow = this.img("img/svg/arrow.svg", "interactive-arrow", 16, 20, "Flecha");
    // <button>
    let button = document.createElement("button");
    button.addEventListener('click', interactiveMenu.descriptionButtonHandler);
    button.append(imgDecoration, h2, imgArrow, p);
    // <li>
    let li = document.createElement("li");
    li.appendChild(button);
    return li;
  }
}

const interactiveMenu = {
  items: [],
  selected: 0,
  requested: false,
  sectionButtonHandler: function (event) {
    if (interactiveMenu.requested) {
      DOM.render(interactiveMenu.items[event.target.getAttribute("j-index")]);
    }
  },
  descriptionButtonHandler: function (event) {
    DOM.toggleParagraph(event.target);
  },
  request: function () {
    fetch("./interactiveMenu.json")
      .then((itemsJson) => itemsJson.json())
      .then((items) => {
        this.items = items;
        this.requested = true;
        DOM.render(this.items[0]);
      });
  },
};

interactiveMenu.request();
DOM.sectionButtons.forEach((button) => button.addEventListener("click", interactiveMenu.sectionButtonHandler));