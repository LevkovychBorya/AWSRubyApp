var CommentItem = React.createClass({
  mixins: [CheckUserId],

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="text-muted">
            {/*will be replaced with user name further*/}
            <span>{this.checkUserId() ? "you" : "user " + this.props.user_id}</span>
            <span>{" wrote on " + this.props.date + ":"}</span>
          </div>
          <span>{this.props.body}</span>
          {this.checkUserId() ? <DestroyComment {...this.props}/> : false}
        </div>
      </div>
    );
  }
});
