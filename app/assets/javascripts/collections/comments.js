Bb.Collections.Comments = Backbone.Collection.extend({
  model: Bb.Models.Comment,
  initialize: function(props) {
      this.url = props.url;
  }
});
