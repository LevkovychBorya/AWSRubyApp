var Album = React.createClass({
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
      }.bind(this)
    });
  },
  componentWillUnmount: function () {
    this.album.off('change');
  },

  onDeleteAlbum: function(id) {
    var self = this;
    bootbox.confirm("Are you sure?", function(confirmation) {
      if(confirmation == true) {
        var album = new Bb.Models.Album({id: id});
        album.destroy({
          success: function(model, response, options) {
            this.transitionTo('albums');
          }.bind(this),
          dataType: "text"
        });
      }
      else {
        return;
      }
    }.bind(this));
  },

  modalShow: function(picture) {
    var self = this;
    var pictures = self.state.album.pictures;
    var index;
            self.state.album.pictures.forEach(function(pic){
              if(pic.image.url == picture.image.url) {
                index = self.state.album.pictures.indexOf(pic);
              }
            });
    bootbox.dialog({
      size: 'large',
      message: '<div class="row">' +
            '<div id="content" class="col-md-8">' +
              '<img id="current_picture" class="img-responsive"' + 'src=' + picture.image.url + '/>' +
            '</div>' +
            '<div class="col-md-4">' +
              '<h2 id="title" >' + picture.title + '</h2>' +
              '<p id="description">' + picture.description + '</p>' +
            '</div>' +
          '</div>',
      show: true,
      backdrop: true,
      animate: true,
      buttons: {
        prev: {
          label: "Prev",
          className: 'btn btn-primary',
          callback: function() {
              if(index > 0) {
                index -= 1
              }
              else {
                index = pictures.length - 1;
              }
              $("#content #current_picture").attr('src', pictures[index].image.url);
              $('.row h2#title').html(pictures[index].title)
              $('.row p#description').html(pictures[index].description)
            return false;
          }
        },
        next: {
          label: "Next",
          className: 'btn btn-primary',
          callback: function() {
              if(index < pictures.length - 1) {
                index += 1
              }
              else {
                index = 0;
              }
            $("#content #current_picture").attr('src', pictures[index].image.url);
            $('.row h2#title').html(pictures[index].title)
            $('.row p#description').html(pictures[index].description)
            return false;
          }
        }
      }
    });
  },

  render: function () {
    var self = this;
    return (
      <div>
        <AlbumShow title = {this.state.album.title}
                   description = {this.state.album.description}
                   album = {this.state.album}
                   author = {this.state.album.user_id} />
                   <div className='row'>
                     {this.state.pictures.map(function(picture) {
                        return <div className='col-md-3' id='showAlbum' key = {picture.id} ><img src={picture.image.url} onClick={self.modalShow.bind(null, picture)} /></div>;
                     })}
                   </div>
        <div className='well'>
          <ToAlbums />
          <button className='btn btn-default' onClick={this.onDeleteAlbum.bind(this, this.state.album.id)} >Delete</button>
          <ToAlbumEdit id= {this.state.album.id} />
          <ToNewPicture id= {this.state.album.id} />
          <ToPictures id= {this.state.album.id} />
        </div>
      </div>
      );
  }
});

var AlbumShow = React.createClass({
  render: function () {
    return (
      <div>
         <AlbumTitle title = {this.props.title} />
         <AlbumDescription description = {this.props.description} />
         <AlbumAuthor author = {this.props.author} />
      </div>
    );
  },
});


