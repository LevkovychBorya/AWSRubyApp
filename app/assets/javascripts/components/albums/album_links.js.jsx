var ToAlbums = React.createClass({
  render: function() {
    return <Link to={'albums'}>To albums</Link>
  }
});
var ToAlbumEdit = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.id +'/edit'} >Edit</Link>
   );
  }
});

var ToNewPicture = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.id +'/pictures/new'} >Add picture</Link>
   );
  }
});
var ToPictures = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.id +'/pictures'} >Manage pictures</Link>
   );
  }
});
var NewAlbumLink = React.createClass({
  render: function() {
    return (
        <Link className="btn btn-primary" to={'albumNew'}>New album</Link>
    );
  }
});
