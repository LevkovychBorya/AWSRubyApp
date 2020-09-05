var ManArticlesDisplay = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
        <div class="list-group">
          <a href="#" className="list-group-item">
            <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>
            <h4 className="list-group-item-heading">Article 1</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
          <a href="#" className="list-group-item">
          <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>

            <h4 className="list-group-item-heading">Article 2</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
          <a href="#" className="list-group-item">
          <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>

            <h4 className="list-group-item-heading">Article 3</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
        </div>
        </div>
      </div>
    );
  }
});
