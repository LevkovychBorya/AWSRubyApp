var SignOutLink = React.createClass({

  signOut: function(e) {
    e.preventDefault();
    $.ajax({
      url: "/users/sign_out",
      method: "DELETE",
      success: function() {
        window.location.href = "/";
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  },

  render: function() {
    return (
      <li>
        <a href='#users/sign_out' onClick={this.signOut}>Log Out <span className="glyphicon glyphicon-log-out"></span></a>
      </li>
    );
  }
});
