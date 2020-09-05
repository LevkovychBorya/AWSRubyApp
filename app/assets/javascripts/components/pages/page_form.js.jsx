var PageForm = React.createClass({

  getInitialState: function() {
    return {page: {}};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({page: nextProps.page});
  },

  handleChange: function(e) {
    var newState = this.state.page;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  componentDidMount: function() {
    var self = this;
    tinymce.init($.extend($.extend(window.tinymce_custom_options, {selector: "textarea#body"}), {
      init_instance_callback: function(){
        if(self.state.page.body){
          tinymce.activeEditor.setContent(self.state.page.body);
        }
      }
    }));
  },

  componentDidUpdate: function(){
    if(this.state.page.body && tinymce.activeEditor){
      tinymce.activeEditor.setContent(this.state.page.body);
    }
  },

  componentWillUnmount: function() {
    tinymce.remove('#body');
  },
  
  onSubmit: function(e) {
    e.preventDefault();
    var page = {};
    for (var field in this.refs) {
      if(field == 'body'){
        page[field] = tinymce.activeEditor.getContent();
      } else {
        page[field] = React.findDOMNode(this.refs[field]).value.trim();
      }
    }
    this.props.handleSubmit(page);
  },

  render: function() {
    return (
      <div className="pages_container">
        <form className="pageForm" onSubmit={this.onSubmit} >
          <div className="form-group page-form ">
            <input
              ref="title"
              id="title"
              value={this.state.page.title}
              onChange={this.handleChange}
              className="form-control"
              type="text"
              placeholder="Title"
              required
            />
          </div>

          <div className="form-group page-form ">
           
            <textarea
             ref="body"
             id="body"
             value={this.state.page.body}
             onChange={this.handleChange}
             className="tinymce form-control"
             placeholder="Body"
            />
          </div>

          <input className="btn btn-primary" type="submit" value="Create" />
        </form>
      </div>
    );
  }
});
