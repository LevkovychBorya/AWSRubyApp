Bb.Models.Album = Backbone.Model.extend({
	urlRoot: '/api/v1/albums',
  validate: function(attrs, options) {
    if (attrs.title == '') {
      return "Title can't be empty!";
    }
  }
});
