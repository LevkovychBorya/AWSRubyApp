var ArticleForm = React.createClass({
  getInitialState: function() {
    return {article: {}};
  },

 componentDidMount: function() {
    tinymce.init($.extend($.extend(window.tinymce_custom_options, {selector: "textarea#body"}), {
      init_instance_callback: function() {
        if (this.state.article.body) {
          tinymce.activeEditor.setContent(this.state.article.body);
        }
      }.bind(this)
    }));
  },

  componentDidUpdate: function() {
    if (this.state.article.body && tinymce.activeEditor) {
      tinymce.activeEditor.setContent(this.state.article.body);
    }
  },

  componentWillUnmount: function() {
    tinymce.remove('#body');
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({article: nextProps.article});
  },

  handleChange: function(e) {
    var newState = this.state.article;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  onSubmit: function(e) {
    e.preventDefault();

    var article = {};
    for (var field in this.refs) {
      if (field === 'body') {
        article[field] = tinymce.activeEditor.getContent();
      } else {
        article[field] = React.findDOMNode(this.refs[field]).value.trim();
      }
    }

    this.props.handleSubmit(article);
  },

  render: function() {
    return (
      <form className="articleForm" onSubmit={this.onSubmit} style={{width: '45%'}}>
        <div className="form-group">
          <input
            ref="title"
            id="title"
            value={this.state.article.title}
            onChange={this.handleChange}
            className="form-control"
            type="text"
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
           ref="body"
           id="body"
           value={this.state.article.body}
           onChange={this.handleChange}
           className="tinymce form-control"
           placeholder="Body"
           />
        </div>
        <div className="form-group form-inline">
          <select
            ref="status"
            id="status"
            value={this.state.article.status}
            onChange={this.handleChange}
            className="form-control btn-info">
              <option value="shared">Public</option>
              <option value="restricted">Private</option>
          </select>
        </div>
        <input className="btn btn-primary" type="submit" value="Post" />
      </form>
    );
  }
});
