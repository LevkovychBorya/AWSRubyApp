var EditPage = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState: function() {
    return {page: {}};
  },
  
  componentDidMount: function() {
    var id = this.props.params.pageId;
    (new Bb.Models.Page({id: id})).fetch({
      success: function(model) {
        this.setState({
          page: model.toJSON(),
          model: model
        });
      }.bind(this)});
  },

  handleSubmit: function(page) {
    this.state.model.save({page}, {
      patch: true,
      success: function() {
        this.transitionTo("page", {pageId: this.state.page.id});
      }.bind(this)});
  },

  render: function() {
    return (
      <div>
        <BackToPages />
        <h2>Edit Page:</h2>
        <PageForm
          page={this.state.page}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
});
