var Pictures  = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      album: {},
      pictures: [],
      hidden: true
    };
  },
  getData: function() {
    var album = new Bb.Models.Album({id: this.props.params.albumId});
    album.fetch({
      success: function(model, response, options) {
        this.setState({ album: model.toJSON(), pictures: model.toJSON().pictures});
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.getData();
  },

  onDelete: function(picture) {
    var self = this;
    bootbox.confirm("Are you sure?", function(confirmation) {
      if(confirmation == true) {
        var pic = new Bb.Models.Picture({id: picture.id});
        pic.destroy({
          success: function(model, response, options) {
            self.getData();
          }.bind(this),
          dataType: "text"
        });
      }
      else {
        return;
      }
    });
  },

  render: function() {
    var self = this;
    return(
      <div>
      <h2>Manage pictures of <b>{this.state.album.title}</b> album</h2>
        <div className='row'>
                     {this.state.pictures.map(function(picture) {
                        return <div className='col-md-3 thumbnail' key = {picture.id} >
                          <img src={picture.image.url} />
                          <span className='btn btn-default' onClick={self.onDelete.bind(null, picture)}>Delete</span>
                          <ToEditPicture picture_id = {picture.id}
                                         album_id = {self.state.album.id} />
                        </div>;
                     })}
        </div>
        <ToAlbum album_id = {this.state.album.id} />
      </div>
    );
  }
});

var ToAlbum = React.createClass({
  render: function() {
   return (<Link className='' to={'/albums/'+ this.props.album_id } >Back to album</Link>
   );
  }
});
var ToPictureManage = React.createClass({
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


