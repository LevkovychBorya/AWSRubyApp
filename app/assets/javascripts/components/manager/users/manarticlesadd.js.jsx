var ManArticlesAdd = React.createClass({
  render: function() {
    return (
      <form action="/users">
          <div className="field">
            <label htmlFor="user_email">Article title</label><br />
            <input className='form-control' name="" id=''/>
          </div>
          <div className="field">
            <label htmlFor="text">Article content</label>
            <textarea className='form-control' name="" id="text" />
          </div>

          <br />
          <div className="actions">
            <input className='btn btn-default btn-submit' type="submit" name="commit" value="Add article" />
          </div>
        </form>
    );
  }
});
