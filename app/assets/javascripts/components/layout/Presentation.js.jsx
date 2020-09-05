var Presentation = React.createClass({
  render: function() {
    return (
    	<div className= 'row'>
    	<div className='col-md-2'>
      <img alt="Giraffe" src="/assets/giraffe.png" height= "150px" width="150px"/>
      </div>
    <div className='col-md-10'> 
      <h3> Our school offers:</h3>
       <ul>
        <li> a friendly, caring and safe learning environment</li>
        <li>wide variety of English language courses for adults</li>
        <li>experienced and professional teachers</li>
        <li>over 60 different nationalities every year</li>
        <li>large, spacious but friendly school with 32 classrooms in 3 buildings</li>
      </ul>
    </div>
    </div>
     );
   }
});
