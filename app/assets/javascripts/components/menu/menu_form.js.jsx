var MenuForm = React.createClass({
  getInitialState: function() {
    return {menu: {}};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({menu: nextProps.menu});
  },

  handleChange: function(e) {
    var newState = this.state.menu;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  onSubmit: function(e) {
    e.preventDefault();

    var menu = {};
    for (var field in this.refs) {
    menu[field] = React.findDOMNode(this.refs[field]).value.trim()
  }

  this.props.handleSubmit(menu);
  },
  render: function() {
   return (
    <form className="menuForm" onSubmit={this.onSubmit}>

    <div className="form-group form-inline">
       <input className="form-control" 
       ref="parent_id"
       id='parent_id'
       value={this.state.parent_id}
       onChange={this.handleChange}
       className="form-control"
       type="text"
       placeholder="0 or ID of parent item"/>
     </div>

     <div className="form-group form-inline">
       <input className="form-control" 
       ref="name"
       id='name'
       value={this.state.name}
       onChange={this.handleChange}
       className="form-control"
       type="text"
       placeholder="Name"/>
     </div>

     <div className="form-group form-inline">
       <input className="form-control" 
       ref="url"
       id='name'
       value={this.state.url}
       onChange={this.handleUrlChange}
       className="form-control"
       type="text"
       placeholder="#Url"/>
     </div>

    <input className="btn btn-success" type="submit" value="Submit" />

  </form>
  );
 }
});
