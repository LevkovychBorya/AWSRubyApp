var ManUsersDisplay = React.createClass({
  render: function() {
    return (
      <div className='panel-item'>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>lolpop32@giraffe.com</td>
              <td>Sasha</td>
              <td>admin</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>and@giraffe.com</td>
              <td>Andrew</td>
              <td>user</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>pet@giraffe.com</td>
              <td>Peter</td>
              <td>editor</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
