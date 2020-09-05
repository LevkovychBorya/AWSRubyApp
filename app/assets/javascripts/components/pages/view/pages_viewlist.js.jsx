var PagesViewList = React.createClass({
  render: function() {
    var pageNodes = this.props.data.map(function(page, index) {
      return (
        <PageViewItem
          id={page.id}
          title={page.title}
          body={page.body}
          path={page.path}
          key={index}
          handleClick={this.props.handleClick}
        />
      );
    }.bind(this));
    return (
      <div >
        {pageNodes}
      </div>
    );
  }
});
