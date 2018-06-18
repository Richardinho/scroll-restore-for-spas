var HoloceneView = Backbone.View.extend({
  initialize : function (options) {
    this.router = options.router;
  },

  render : function (options) {
    this.el.innerHTML = this.template();
    return this.el;
  },

  template : _.template(document.querySelector('#holocene-template').innerHTML)
});

HoloceneView.inject = ['router'];
