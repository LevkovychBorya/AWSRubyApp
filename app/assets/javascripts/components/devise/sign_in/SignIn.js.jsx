var SignIn = React.createClass({
  mixins: [SetTokenMixin],

  render: function() {
    return (
      <div>
        <h2>Log in</h2>
        <form className="new_user" id="new_user" action="/users/sign_in" acceptСharset="UTF-8" method="post">
          <input type="hidden" name="authenticity_token" value={this.state.token} />
          <div className="field">
            <label htmlFor="user_email">Email</label><br />
            <input autofocus="autofocus" type="email" name="user[email]" id="user_email" />
          </div>

          <div className="field">
            <label htmlFor="user_password">Password</label><br />
            <input autoComplete="off" type="password" name="user[password]" id="user_password" />
          </div>

            <div className="field">
              <input name="user[remember_me]" type="hidden" value="0" />
              <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me" />
              <label htmlFor="user_remember_me">Remember me</label>
            </div>

          <div className="actions">
            <input type="submit" name="commit" value="Log in" />
          </div>
        </form>

        <Link to="sign_up">Sign up</Link><br />
        <Link to="password_new">Forgot your password?</Link><br />
      </div>
    );
  }
});
