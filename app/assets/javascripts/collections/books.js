Bb.Collections.Books = Backbone.Collection.extend({
  url: '/api/v1/books',
  model: Bb.Models.Book,
});
