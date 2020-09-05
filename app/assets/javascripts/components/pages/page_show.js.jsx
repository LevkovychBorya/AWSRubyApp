var Page = React.createClass({
  getInitialState: function() {
    return {page: []};
  },

  componentDidMount: function() {
    (new Bb.Models.Page({id: this.props.params.pageId})).fetch({
      success: function(model) {
        this.setState({page: model.toJSON()});
      }.bind(this)});
  },

  render: function() {
    return (
      <div className="container-fluid pages_container">
        <div className="row wrapper-page-buttons">
          <BackToPages className="h3 col-md-10"/>
          <EditPageLink params={{pageId: this.props.params.pageId}}/>
          <DestroyPage id={this.state.page.id} />
        </div>
        <h2>{this.state.page.title}</h2>
        <p> {this.state.page.body}</p>
      </div>
    );
  }
});
