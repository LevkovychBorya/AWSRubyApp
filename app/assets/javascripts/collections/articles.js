Bb.Collections.Articles = Backbone.Collection.extend({
  url: "/api/v1/articles",
  model: Bb.Models.Article,

  initialize: function(props) {
    if (props && props.path) this.url += props.path;
  }
});
