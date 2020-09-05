var Albums  = React.createClass({
  getInitialState: function () {
    return {
      albums: []
    };
  },

  getData: function() {
    var albums = new Bb.Collections.Albums();
    albums.fetch({
      success: function(collection, response, options) {
        this.setState({albums: collection.toJSON()})
      }.bind(this),
      error: function(collection, response, options) {
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.getData();
  },

  render: function () {
    return (
      <div className='row'>
        <h1>Albums</h1>
        {this.state.albums.map(function(album) {
          return <AlbumView key = {album.id}
                            id = {album.id}
                            image = {album.pictures[0] ? album.pictures[0].image.url : 'assets/sample.jpg'}
                            title = {album.title}
                            description = {album.description}
                            author = {album.user_id}/>;
        })}
                <div className='col-md-12 well' >
                  <NewAlbumLink  />
                </div>
      </div>
    );
  }
});

var AlbumView = React.createClass({
  render: function() {
    return (
      <div className='col-md-4'>
        <div className='thumbnail'>
          <AlbumImage image = {this.props.image} id = {this.props.id} />
          <div className='caption'>
            <AlbumTitle title = {this.props.title} />
            <AlbumDescription description = {this.props.description.substring(0,30)} >...</AlbumDescription>
            <AlbumAuthor author = {this.props.author} />
          </div>
        </div>
      </div>
    );
  }
});

var AlbumImage = React.createClass({
  render: function() {
    return (
      <Link to={'/albums/' + this.props.id}><img src={this.props.image} alt='no image yet:)'/></Link>
    );
  }
});

var AlbumTitle = React.createClass({
  render: function() {
    return (
      <h2>{this.props.title}</h2>
    );
  }
});

var AlbumDescription = React.createClass({
  render: function() {
    return (
      <p>{this.props.description}{this.props.children}</p>
    );
  }
});
var AlbumAuthor = React.createClass({
  render: function() {
    return (
     <p className="author">author:{this.props.author}</p>
    );
  }
});



