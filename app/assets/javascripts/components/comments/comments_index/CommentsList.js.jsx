var CommentsList = React.createClass({
  mixins: [ParseDate],

  render: function() {
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (
        <CommentItem
          key={index}
          id={comment.id}
          body={comment.body}
          date={this.parseDate(comment.created_at)}
          user_id={comment.user_id}
          index={index}
          handleDestroy={this.props.handleDestroy}
          {...this.props}
        />
      );
    }.bind(this));
    return (
      <div>
        {commentNodes.reverse()}
      </div>
    );
  }
});
