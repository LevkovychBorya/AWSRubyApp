var SignUp = React.createClass({
  mixins: [SetTokenMixin],

  render: function() {
    return (
      <div>
        <h2>Sign up</h2>
        <form className="new_user" id="new_user" action="/users" acceptCharset="UTF-8" method="post">
          <input type="hidden" name="authenticity_token" value={this.state.token} />

          <div className="field">
            <label htmlFor="user_email">Email</label><br />
            <input autofocus="autofocus" type="email" name="user[email]" id="user_email" />
          </div>

          <div className="field">
            <label htmlFor="user_password">Password</label>
            <em>(8 characters minimum)</em>
            <br />
            <input autoComplete="off" type="password" name="user[password]" id="user_password" />
          </div>

          <div className="field">
            <label htmlFor="user_password_confirmation">Password confirmation</label><br />
            <input autoComplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
          </div>

          <div className="actions">
            <input type="submit" name="commit" value="Sign up" />
          </div>
        </form>

        <Link to="sign_in">Sign in</Link>
      </div>
    );
  }
});
