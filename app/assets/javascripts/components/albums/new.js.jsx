var AlbumNew = React.createClass({
  mixins: [ReactRouter.Navigation],
  handleSubmit: function(album) {
  var alb = new Bb.Models.Album();
  alb.on("invalid", function(model, error) {
      bootbox.alert({message: error});
  });
  alb.save(album.album,{
       success: function(data) {
         this.transitionTo('/albums');
       }.bind(this)
     });
  },
  render: function() {
    return (
      <div className='albumNew'>
        <h2>New Album</h2>
        <AlbumForm handleSubmit={this.handleSubmit} buttonRole='Create album'/>
        <ToAlbums />
      </div>
    );
  }
});
