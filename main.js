function init() {

  var data = {
    currentCat: null,
    adminPanelState: false,
    cats: [{
        clickCount: 0,
        name: 'cat1',
        url: 'https://image.shutterstock.com/display_pic_with_logo/2856265/259729697/stock-photo-blue-eyed-cat-259729697.jpg'
      },

      {
        clickCount: 0,
        name: 'cat2',
        url: 'https://cdn.pixabay.com/photo/2018/03/08/11/29/animalia-3208412__340.jpg'
      },

      {
        clickCount: 0,
        name: 'cat3',
        url: 'https://cdn.pixabay.com/photo/2018/03/12/17/52/cat-3220381__340.jpg'
      },

      {
        clickCount: 0,
        name: 'cat4',
        url: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg'
      },

      {
        clickCount: 0,
        name: 'cat5',
        url: 'https://image.shutterstock.com/display_pic_with_logo/2856265/259729697/stock-photo-blue-eyed-cat-259729697.jpg'
      }
    ]
  }

  var controller = {
    init: function () {
      data.currentCat = data.cats[0];
      catView.init();
      catListView.init();
      adminPanelView.init();
    },

    getCurrentCat: function () {
      return data.currentCat;
    },

    openAdminPanel: function () {
      if (data.adminPanelIsHidden) {
        data.adminPanelIsHidden = false;
        adminPanelView.render();
      }
    },

    closeAdminPanel: function () {
      data.adminPanelIsHidden = true;
    },

    getCats: function () {
      return data.cats;
    },

    updateCurrentCat: function () {
      adminPanelView.render();
      catView.render();
      catListView.render();
    },

    setCurrentCat: function (cat) {
      data.currentCat = cat;
    },

    incrementCounter: function () {
      data.currentCat.clickCount++;
      catView.render();
    }
  };

  var catView = {
    init: function () {
      this.catElement = document.querySelector('.cat-display-area');
      this.catName = document.querySelector('.cat-name');
      this.clickCounter = document.querySelector('.cat-counter');
      this.catImg = document.querySelector('.cat-img');

      this.catImg.addEventListener('click', function (e) {
        controller.incrementCounter();
      });

      this.render();
    },

    render: function () {
      var currentCat = controller.getCurrentCat();
      this.clickCounter.textContent = currentCat.clickCount;
      this.catName.textContent = currentCat.name;
      this.catImg.src = currentCat.url;
    }
  }

  var catListView = {

    init: function () {
      this.catsList = document.querySelector('.cats-list');
      this.render();
    },

    render: function () {
      var catsListItem;
      var cats = controller.getCats();
      var cat;

      this.catsList.innerHTML = ' ';
      for (var i = 0; i < cats.length; i++) {
        cat = cats[i]
        catsListItem = document.createElement('li');
        catsListItem.className = 'cat-list__item';
        catsListItem.textContent = cat.name;

        catsListItem.addEventListener('click', (function (catCopy) {
          return function () {
            controller.setCurrentCat(catCopy);
            catView.render();
          }
        })(cat));
        this.catsList.appendChild(catsListItem);
      }
    }
  }
  var adminPanelView = {
    init: function () {
      this.adminBtn = document.querySelector('.admin__btn');
      this.adminForm = document.querySelector('.admin__form');
      this.adminFormName = document.querySelector('.admin__form-name');
      this.adminFormUrl = document.querySelector('.admin__form-url');
      this.adminFormClicks = document.querySelector('.admin__form-clicks');
      this.adminSaveBtn = document.querySelector('.admin__save-btn');
      this.adminCancelBtn = document.querySelector('.admin__cancel-btn');
      
      this.adminBtn.addEventListener('click', function (e) {
        e.preventDefault()
        controller.openAdminPanel();
        this.adminForm.hidden = false;
      }.bind(this));

      this.adminCancelBtn.addEventListener('click', function (e) {
        e.preventDefault();
        controller.closeAdminPanel();
        this.adminForm.hidden = true;
      }.bind(this));

      this.adminSaveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        controller.updateCurrentCat()
      }.bind(this));
    },

    render: function () {
      var currentCat = controller.getCurrentCat();
      currentCat.name = this.adminFormName.value;
      currentCat.url = this.adminFormUrl.value;
      currentCat.clickCount = this.adminFormClicks.value;
      this.adminForm.reset();
    }
  }
  controller.init();
}
window.onload = init;