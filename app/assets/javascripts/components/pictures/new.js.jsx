var PictureNew = React.createClass({
  render: function() {
    return (
      <div className='pictureNew'>
        <h2>New Picture</h2>
        <PictureForm handleSubmit={this.addPicture} buttonRole='Create picture' album_id = {this.props.params.albumId}/>
        <ToAlbums />
      </div>
    );
  }
});
