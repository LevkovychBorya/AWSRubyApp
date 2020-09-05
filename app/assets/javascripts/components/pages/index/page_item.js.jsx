var PageItem = React.createClass({
  render: function() {
    return (
      <div>
        <Link 
          to='page' 
          params={{pageId: this.props.id}} 
          className="link pageItem"
        >
          {this.props.title}
        </Link>
        <br />
      </div>
    );
  }
});
