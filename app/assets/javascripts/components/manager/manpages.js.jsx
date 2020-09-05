var ManPages = React.createClass({
  getInitialState: function(){
    return {checked: 'display', pagetitle: 'Pages management'};
  },
  render: function() {
    var swicher = this.state.checked == 'display' ? <Pages /> : <NewPage />
      return (
        <div>
          <Breadcrumbs pagetitle={this.state.pagetitle} />
          <Title pagetitle={this.state.pagetitle}  onTitleLinkClick={this.handleTitleLinkClick} />
          <hr/>
          <div className="pages-wrapper">
          {swicher}
          </div>
        </div>
    );
  },
  handleTitleLinkClick: function(number) {
    this.setState({checked: number});
  },
});
