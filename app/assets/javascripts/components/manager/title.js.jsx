var Title = React.createClass({
	render: function() {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-9'>
          <h2>{this.props.pagetitle}</h2>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-3'>
          <div className='btn-group pull-right'>
            <button id='display' onClick={this.handleClick} className='btn btn-default btn-md'>Display</button>
            <button id='add' onClick={this.handleClick} className='btn btn-default btn-md'>New</button>
          </div>
        </div>
      </div>
    );
	},
  handleClick: function(e) {
    this.props.onTitleLinkClick(e.target.id);
  },
});
