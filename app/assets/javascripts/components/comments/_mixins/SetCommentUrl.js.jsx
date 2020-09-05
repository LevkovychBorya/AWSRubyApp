var SetCommentUrl = {
  setCommentUrl: function() {
    return "/api/v1/" + this.props.commentable_type + "/" + this.props.commentable_id + "/comments"
  }
}
