Bb.Collections.Albums = Backbone.Collection.extend({
  url: '/api/v1/albums',
  model: Bb.Models.Album
});
