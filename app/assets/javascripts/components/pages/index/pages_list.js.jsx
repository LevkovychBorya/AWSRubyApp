var PagesList = React.createClass({
  render: function() {
    var pageNodes = this.props.data.map(function(page, index) {
      return (
        <PageItem
          id={page.id}
          title={page.title}
          body={page.body}
          path={page.path}
          key={index}
        />
      );
    });
    return (
      <div >
        {pageNodes}
      </div>
    );
  }
});
