const DOM = {
  imageContainers: document.querySelectorAll(".galery-imageContainer"),
  imagePopup: document.querySelector(".imagePopup"),
  closeButton: document.querySelector(".imagePopup-closeButton"),
  image: document.querySelector(".imagePopup img"),
  toggleImagePopup: function () {
    DOM.imagePopup.classList.toggle("j-enable");
  },
  setImageSrc: function (src) {
    this.image.src = src;
  },
};

const imagePopup = {
  open: false,
  openImage: function (imgId) {
    DOM.setImageSrc(`img/galery/galery${imgId}.jpg`);
    DOM.toggleImagePopup();
    this.open = true;
  },
  closeImage: function () {
    DOM.toggleImagePopup();
    this.open = false;
  },
  escHandler: function () {
    if (imagePopup.open) {
      imagePopup.closeImage();
    }
  },
};

DOM.imageContainers.forEach((imageContainer) => {
  imageContainer.addEventListener("click", (e) => {
    imagePopup.openImage(e.target.getAttribute("j-index"));
  });
});
DOM.closeButton.addEventListener("click", imagePopup.closeImage);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    imagePopup.escHandler();
  }
});
