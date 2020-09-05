var ManUserAdd = React.createClass({
  render: function() {
    return (
      <form className="new_user" action="/users">
          <div className="field">
            <label htmlFor="user_email">Email</label><br />
            <input className='form-control' type="email" name="user[email]" />
          </div>
          <div className="field">
            <label htmlFor="user_password">Password</label>
            <em>(8 characters minimum)</em>
            <br />
            <input className='form-control' autoComplete="off" type="password" name="user[password]" id="user_password" />
          </div>
          <div className="field">
            <label htmlFor="user_password_confirmation">Password confirmation</label><br />
            <input className='form-control' autoComplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
          </div>
          <br />
          <div className="actions">
            <input className='btn btn-default btn-submit' type="submit" name="commit" value="Sign up" />
          </div>
        </form>
    );
  }
});
