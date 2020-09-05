var AlbumEdit = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      album: {}, 
      pictures: []
    };
  },
  componentDidMount: function () {
    this.album = new Bb.Models.Album({id: this.props.params.albumId});
    this.album.fetch({
      success: function(model, response, options) {
        this.setState({ album: model.toJSON(), pictures: model.toJSON().pictures});
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }.bind(this)
    });  
  },
  componentWillUnmount: function () {
    this.album.off('change');
  },
	editAlbum: function(album) {
    var alb = new Bb.Models.Album({id: this.props.params.albumId});
    var temp = album.album;
    alb.on("invalid", function(model, error) {
      bootbox.alert({message: error});
    });
    alb.save(temp, {
      success: function(model, response, options) {
        this.setState({ album: model.toJSON(), pictures: model.toJSON().pictures});
        this.transitionTo('/albums/' + this.props.params.albumId);
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='albumEdit'>
        <h2>Edit Album</h2>
        <AlbumForm handleSubmit={this.editAlbum}
                   buttonRole='Edit album'
                   title={this.state.album.title}
                   description={this.state.album.description}
                   user_id={this.state.album.user_id}
                   album = {this.state.album} />
        <ToAlbums />
      </div>
    );
  }
});
