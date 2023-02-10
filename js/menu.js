const DOM = {
  list: document.querySelector(".interactive-content"),
  sectionButtons: document.querySelectorAll(".interactive-selector > button"),
  descButtons: [],
  createImg: function (src, className, width, height, alt) {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add(className);
    img.alt = alt;
    img.width = width;
    img.width = height;
    return img;
  },
  createItem: function (index, title, description) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let imgDecoration = this.createImg("img/svg/decorator-brown.svg", "interactive-decorator", 12, 12, "Decorador");
    let imgArrow = this.createImg("img/svg/arrow.svg", "interactive-arrow", 16, 20, "Flecha");
    h2.classList.add("t2-m", "b5");
    p.classList.add("t2-s", "b6");
    h2.innerText = title;
    p.innerText = description;
    button.setAttribute('j-index', index);
    button.append(imgDecoration, h2, imgArrow, p);
    li.appendChild(button);
    return li;
  },
  fillList(items) {
    this.list.innerHTML = '';
    items.forEach((item, index) => {
      this.list.appendChild(this.createItem(index, item.name, item.description));
    });
    this.descButtons = document.querySelectorAll(".interactive-content button");
    this.setDescriptionEventListeners();
  },
  setSectionsEventListeners: function () {
    DOM.sectionButtons.forEach((button) => button.addEventListener("click", interactiveMenu.sectionButtonHandler));
  },
  setDescriptionEventListeners: function () {
    DOM.descButtons.forEach((button) => button.addEventListener("click", interactiveMenu.descriptionButtonHandler));
  },
  toggleParagraph: function (index) {
    this.descButtons[index].classList.toggle("j-active");
  }
};

const interactiveMenu = {
  items: [],
  requested: false,
  sectionButtonHandler: function (event) {
    if (interactiveMenu.requested) {
      DOM.fillList(interactiveMenu.items[event.target.getAttribute("j-index")]);
    }
  },
  descriptionButtonHandler: function (event) {
    DOM.toggleParagraph(event.target.getAttribute("j-index"));
  },
  request: function () {
    fetch("./interactiveMenu.json")
      .then((itemsJson) => itemsJson.json())
      .then((items) => {
        this.items = items;
        this.requested = true;
        DOM.fillList(this.items[0]);
      });
  },
};
interactiveMenu.request();
DOM.setSectionsEventListeners();