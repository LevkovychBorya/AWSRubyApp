var Footer = React.createClass({
  render: function() {
    return (
      <footer className ="footer">
      <div className='row'>
  <div className ="col-md-1">
    <img alt="Giraffe" height="150px" src="/assets/giraffe.png" width="120px"/>
  </div>
  <div className='col-md-3 links'>
   <h3>Language School</h3>
    <ul> 
     <li>
       <a href='#'>Our school</a>
      </li>
      <li>
        <a href='#'>Our teachers</a>
      </li>
      <li>
        <a href='#'>Events</a>
      </li>
      <li>
        <a href='#'>Articles</a>
      </li>
      <li>
        <a href='#'>Photogallery</a>
      </li>
    </ul>
  </div>
  <div className ="col-md-5">
    <h3>Join our mailing list</h3>
    <p>Subscribe to get our weekly newsletter delivered directly to your inbox</p>
    <input placeholder="Enter your email" type="text"></input>
    <input type="submit" value="subscribe"></input>
  </div>
  <div className ="col-md-3">
    <h3>Contact Us</h3>
    <p>Giraffe Street,1</p>
    <p>Lviv, Ukraine</p>
    <p>giraffe@gmail.com </p>
  </div>
  </div>
</footer>
    );
   }
});
