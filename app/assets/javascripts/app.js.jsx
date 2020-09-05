//global object for storing Backbone entities
var Bb = {
  Models: {},
  Collections: {},
  Helpers: {}
};

// main React component
var App = React.createClass({
  render: function () {
    return (
      <ReactRouter.RouteHandler />
    );
  }
});
