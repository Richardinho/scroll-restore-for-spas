var FantasticAdventuresView = Backbone.View.extend({

    initialize : function (options) {
        this.router = options.router;
    },

    render : function (options) {

        this.el.innerHTML = this.template();
        return this.el;
    },

    template : _.template(document.querySelector('#fa-template').innerHTML)

});

FantasticAdventuresView.inject = ['router'];