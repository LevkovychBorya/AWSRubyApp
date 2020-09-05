var PictureEdit = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      picture: {},
    };
  },
  componentDidMount: function () {
    var pic = new Bb.Models.Picture({id: this.props.params.pictureId});
    pic.fetch({
      success: function(model, response, options) {
        this.setState({ picture: model.toJSON()});
      }.bind(this)
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({picture: nextProps.picture});
  },
  handleChange: function(e) {
    var newState = this.state.picture;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },
  handleFormSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim(),
        description = React.findDOMNode(this.refs.description).value.trim(),
        picture = {title: title, description: description, album_id: this.props.params.albumId};
    var pic = new Bb.Models.Picture({id: this.props.params.pictureId});
    pic.save(picture, {patch: true,
      success: function(model, response, options) {
        this.setState({ picture: model.toJSON()});
        this.transitionTo('/albums/' + this.props.params.albumId + '/pictures');
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
      <h2>Edit Picture</h2>
      <div id='showAlbum'>
        <img src= {this.state.picture.image ? this.state.picture.image.url : false}/>
      </div>
      <form role="form" name="myForm" onSubmit={this.handleFormSubmit} encType = 'multipart/form-data' >
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="string" id="title" name='picture[title]' ref = 'title' className="form-control"value={this.state.picture.title} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="title">Description:</label>
            <textarea type="text" id="description" name='picture[description]' ref = 'description' className="form-control" value={this.state.picture.description} onChange={this.handleChange}></textarea>
          </div>
          <button type="submit" className="btn btn-default" >Update</button>
        </div>
      </form>
      <ToPicturesManage album_id = {this.props.params.albumId} />
      </div>
    );
  }
});
