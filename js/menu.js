const DOM = {
  list: document.querySelector(".interactive-content"),
  createImg: function (src, className, width, height, alt) {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add(className);
    img.alt = alt;
    img.width = width;
    img.width = height;
    return img;
  },
  createItem: function (title, description) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let imgDecoration = this.createImg( "img/svg/decorator-brown.svg", "interactive-decorator", 12, 12, "Decorador");
    let imgArrow = this.createImg("img/svg/arrow.svg", "interactive-arrow", 16, 20, "Flecha");
    h2.classList.add("t2-m", "b5");
    p.classList.add("t2-s", "b6");
    h2.innerText = title;
    p.innerText = description;
    button.append(imgDecoration, h2, imgArrow, p);
    li.appendChild(button);
    return li;
  },
  fillList(items) {
    items.forEach((item) => {
      this.list.appendChild(this.createItem(item.name, item.description));
    });
  },
};
