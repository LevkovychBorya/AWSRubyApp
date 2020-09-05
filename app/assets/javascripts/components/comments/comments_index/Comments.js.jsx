var Comments = React.createClass({
  mixins: [SetCommentUrl, GetCurrentUserId],

  getInitialState: function() {
    return {comments: [], current_user_id: false};
  },

  componentDidMount: function() {
    var comments = new Bb.Collections.Comments({url: this.setCommentUrl()});
    comments.fetch({
      success: function(collection) {
        this.setState({
          comments: collection.toJSON(),
          current_user_id: this.getCurrentUserId()
        });
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  refreshOnNew: function(new_comment) {
    var comments = this.state.comments;
    comments.push(new_comment);
    this.setState(comments);
  },

  refreshOnDestroy: function(key) {
    var comments = this.state.comments;
    comments.splice(key, 1);
    this.setState(comments);
  },

  handleSubmit: function(comment) {
    var newComment = new Bb.Models.Comment();
    newComment.urlRoot = this.setCommentUrl();
    newComment.save({comment}, {
      success: function(model) {
        this.refreshOnNew(model.toJSON());
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="h3 col-md-6">
            Comments
            {this.state.comments.length == 0
              ? <small style={{display: 'block'}}>Not commented yet</small>
              : false
            }
          </div>
        </div>
        {this.state.current_user_id
          ? <CommentForm handleSubmit={this.handleSubmit} {...this.props}/>
          : false
        }
        <CommentsList
          comments={this.state.comments}
          current_user_id={this.state.current_user_id}
          handleDestroy={this.refreshOnDestroy}
          {...this.props}
        />
      </div>
    );
  }
});
