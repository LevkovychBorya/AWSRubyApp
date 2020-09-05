var Breadcrumbs = React.createClass({
  render: function() {
    return (
      <div className="breadcrumb">
        <li>
          <a href="#/">Home</a>
        </li>
        <li className="active">{this.props.pagetitle}</li>
      </div>
    );
  }
});
