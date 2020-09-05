var PictureForm = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      picture: {},
    };
  },
  componentDidMount: function () {
    var pic = new Bb.Models.Picture();
    // pic.fetch({
    //   success: function(model, response, options) {
    //     this.setState({ picture: model.toJSON()});
    //   }.bind(this)
    // });
    this.setState({picture: pic});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({picture: nextProps.picture});
  },
  handleChange: function(e) {
    var newState = this.state.picture;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.namedItem("myForm"),
        data = new FormData(form),
        oReq = new XMLHttpRequest();
    oReq.open("POST", "api/v1/pictures", true);
    oReq.send(data);
    this.transitionTo('/albums/' + this.props.album_id);
  },

  render: function() {
    return (
      <form role="form" name="myForm" onSubmit={this.handleSubmit} encType = 'multipart/form-data' >
        <div className="col-md-6">
          <div className="form-group">
            <input type="hidden" name='picture[album_id]' value = {this.props.album_id} />
            <label htmlFor="title">Title</label>
            <input type="string" name='picture[title]' className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Description:</label>
            <textarea type="text" name='picture[description]' className="form-control" ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" name='picture[image]' className="form-control" />
          </div>
          <button type="submit"  className="btn btn-default" >{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
