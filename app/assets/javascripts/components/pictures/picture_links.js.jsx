var ToAlbum = React.createClass({
  render: function() {
   return (<Link className='' to={'/albums/'+ this.props.album_id } >Back to album</Link>
   );
  }
});
var ToPicturesManage = React.createClass({
  render: function() {
   return (<Link className='' to={'/albums/'+ this.props.album_id + '/pictures' } >Back to manage</Link>
   );
  }
});
var ToEditPicture = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.album_id + '/pictures/' + this.props.picture_id + '/edit' } >Edit</Link>
   );
  }
});
