var Books  = React.createClass({
  getInitialState: function () {
    return {
      books: []
    };
  },

  getData: function() {
    var books = new Bb.Collections.Books();
    books.fetch({
      success: function(collection, response, options) {
        this.setState({books: collection.toJSON()})
      }.bind(this),
      error: function(collection, response, options) {
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.getData();
  },
  
  render: function () {
    var booksList = this.state.books.map(function (book) {
      return (<Link to={'/books/' + book.id} className="list-group-item" key={book.id}>
        <h4 className="list-group-item-heading">{book.title}</h4>
        <p className="list-group-item-text">{book.description}</p>
        </Link>);
});
    return (
      <div className='container'>
        <h1>Books list</h1>
        <div>{booksList}</div>
         <NewBookLink  />
      </div>
    ); 
  }
});


