var ManArticles = React.createClass({
  getInitialState: function(){
    return {checked: 'display', pagetitle: 'Articles management'};
  },
  render: function() {
    var swicher = this.state.checked == 'display' ? <Articles /> : <NewArticle />
      return (
        <div>
          <Breadcrumbs pagetitle={this.state.pagetitle} />
          <Title pagetitle={this.state.pagetitle}  onTitleLinkClick={this.handleTitleLinkClick} />
          <hr/>
          {swicher}
        </div>
    );
  },
  handleTitleLinkClick: function(number) {
    this.setState({checked: number});
  },
});
