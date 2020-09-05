var PageViewItem = React.createClass({
  
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p
              data-page-id={this.props.id}
              onClick={this.props.handleClick}
              params={{pageId: this.props.id}} 
              className="h4 page_item_list"
            >
              {this.props.title}
            </p>
          </div>
        </div>
      </div>
    );
  }
});
