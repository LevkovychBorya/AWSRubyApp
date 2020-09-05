var NewPassword = React.createClass({
  mixins: [ReactRouter.Navigation, SetTokenMixin],

  getInitialState: function() {
    return {email: ""};
  },

  handleChange: function(e) {
    this.setState({email: e.target.value});
  },

  onSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      url: "/users/password",
      method: "POST",
      data: {
        authenticity_token: this.state.token,
        user: {email: this.state.email}
      },
      success: function() {
        this.transitionTo("sign_in");
        $("#notice")[0].innerHTML = "Password reset instructions were sent to your email.";
      }.bind(this),
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  },

  render: function() {
    return (
      <div>
        <h2>Forgot your password?</h2>

        <form className="new_user" id="new_user" onSubmit={this.onSubmit} acceptCharset="UTF-8" >
          <div className="field">
            <label htmlFor="user_email">Email</label><br />
            <input
              autofocus="autofocus"
              type="email"
              name="user[email]"
              id="user_email"
              onChange={this.handleChange}
            />
          </div>
          <div className="actions">
            <input type="submit" name="commit" value="Send me reset password instructions" />
          </div>
        </form>
      </div>
    );
  }
});


