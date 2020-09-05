var Book = React.createClass({
  getInitialState: function () {
    return {
      book: []
    };
  },
  componentDidMount: function () {
    this.book = new Bb.Models.Book({id: this.props.params.bookId});
    this.book.fetch({
      success: function(model, response, options) {
        this.setState({ book: model.toJSON()});
          console.log(this.book);
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }
    });  
  },
  componentWillUnmount: function () {
    this.book.off('change');
  },

  render: function () {
    return (
      <div className="container-fluid">
        <BookShow title = {this.state.book.title}
                   description = {this.state.book.description}
                   attachment = {this.state.book.attachment}/>
                   

                   <ToDestroyBook id={this.state.book.id} />
                   <ToBookEdit id= {this.state.book.id} />
                   <BackToBooks/>     
      </div>
      );
  }
});
var BookShow = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
         <table className="table">
          <thead>
           <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
           </tr>
          </thead>
          <tbody>
           <tr>
            <td><BookTitle title = {this.props.title} /></td>
            <td><BookDescription description = {this.props.description} /></td>
            <td><BookAttachment attachment = {this.props.attachment} /></td>
           </tr>
          </tbody>
         </table>
       </div>
      </div>
    );
  }
});

var BookTitle = React.createClass({
  render: function() {
    return (
      <div className="col-sm-4">{this.props.title}</div>
    );
  }
});

var BookDescription = React.createClass({
  render: function() {
    return (
      <div>{this.props.description}{this.props.children}</div>
    );
  }
});

var BookAttachment = React.createClass({
  render: function() {
    href_url = '';
    if(this.props.attachment) {
      href_url = this.props.attachment['url'];
    }
    console.log(href_url);
    return (
       <a href= {href_url} >{this.props.attachment}{this.props.children}</a>
    );

  }
});

var NewBookLink = React.createClass({
  render: function() {
    return (
        <Link  className="btn btn-primary col-md-1 active" to={'bookNew'}>New Book</Link>
    );
  }
});

var BackToBooks = React.createClass({
  render: function() {
    return (
      <Link to="books" className="btn btn-link" {...this.props}>
        Back to books
      </Link>
    );
  }
});
var ToBookEdit = React.createClass({
  render: function() {
   return (<Link className='btn btn-primary col-md-1 active'  to={'/books/'+ this.props.id +'/edit'} >Edit</Link>
   );
  }
});

