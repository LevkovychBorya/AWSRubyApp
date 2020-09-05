var FrontPage = React.createClass({
  render: function() {
    return (
<div className="container" id="index-page">
  <Carousel />
  <div className="row" id="presentation">
    <Presentation />
  </div>
  <div className='row' id='static-pages'>
    <h3> Information</h3>
    <PagesView />
  </div>
  <div className="row">
    <div className="col-md-4" id="events">
      <h3>Events</h3>
      <EventsWidget count="7" />
    </div>
    <div className="col-md-4" id="materials">
      <h3>Materials</h3>
      <BooksFront/>
    </div>
    <div className="col-md-4" id="articles">
      <h3>Latest Articles</h3>
      <LatestArticles />
    </div>
  </div>
</div>
    );
   }
});
