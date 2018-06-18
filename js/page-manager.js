var PageManager = Backbone.View.extend({
  initialize : function (options, appEl) {
    this.el = appEl;
  },

  render : function (viewEl) {
    this.cleanEl();
    this.el.appendChild(viewEl);
  },

  cleanEl : function () {
    this.el.innerHTML = '';
  }
});

PageManager.inject = [];
