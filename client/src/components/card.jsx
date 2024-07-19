import React,{useEffect,useState} from 'react';

  
function Card({ props,auth }) {

    return (
  <a href={props.heading} className='card-anchor' >
      <div class="card">
          <img src={props.image} alt="..." />
  
          <div class="card-body">
              <h5 class="card-title">{props.heading}</h5>
              <p class="card-text">{props.outer}.</p>
              <a href="inside.html" class="btn btn-primary">Go somewhere</a>
          </div>
          </div>
          {/* <a href="inside.html" class="btn btn-primary">Go somewhere</a> */}
  </a>
    );
  }
  
 

function CardContainer({props,auth}) {
  var deleteCard = null
  const [cardMaker, cardReRender] = useState(
    props.map((data, index) => (
      <div key={index} className="col-md-3 mb-3">
        <Card props={data} auth={auth} />
      </div>
    ))
  );
    
  useEffect(()=>{
    cardReRender(
      props.map((data, index) => (
        <div key={index} className="col-md-3 mb-3">
          <Card props={data} auth={auth} />
        </div>
      ))
    )
if(auth){
      if(!document.querySelector('.card-link')) {
        deleteCard()  
}
}
},[props,auth])
// [props,auth] the things to check
    

if(auth){

    async function postData(e){
      e.preventDefault()
      const parentHref = e.target.parentElement.getAttribute('href');
      // console.log(e);
      // console.log(parentHref);
      // console.log('Link clicked!');
      const res = await fetch('http://localhost:3000/deleteBlog/',
          {
              method:'POST',
              headers:{
                  'Content-Type' : 'application/json'
              },
      body: JSON.stringify({
                  parcel : {'heading':parentHref}
              })
          }
      ).then((response)=>response.json()).then((dataa)=>{
// console.log(dataa);
        cardReRender(
          dataa.text.map((data, index) => (
            <div key={index} className="col-md-3 mb-3">
              <Card props={data} auth={auth}/> 
            </div>
          ))
        )
   })

    }


    deleteCard = ()=>{
      var cardContainers = document.querySelectorAll('.card-anchor');
    
      cardContainers.forEach(function(container,index) {
        if(index != 0){

              // Create the <a> tag
              var link = document.createElement('a');
              link.onclick= postData
              link.className = 'btn btn-primary card-link'; // Add 'card-link' class for targeting
              link.textContent = 'Delete'; // Set the link text
        
              // Append the <a> tag to the card container
              container.appendChild(link);
            }
      });


    // Make card sharp
      var style = document.createElement('style');
      style.innerHTML = `
.card {  
transition: border-bottom-left-radius 0.5s linear, border-bottom-right-radius 0.5s linear 0.1s; /* Ensure smooth transitions */
}

.card:hover {
border-bottom-left-radius: 0 !important;
border-bottom-right-radius: 0 !important;
/* No need for transition-delay here as the transitions are defined in the .card class */
}
.card-link {
background: rgba(255, 0, 0, 0.6); /* Red color with transparency */
backdrop-filter: blur(10px); /* Blur effect for glass effect */
visibility: hidden;
opacity: 0;
max-height: 0; /* Initially no height */
overflow: hidden; /* Prevent content from overflowing */
border-top-right-radius: 0 !important;
border-top-left-radius: 0 !important;
width: 100%; /* Match the width of .card-anchor */
transition: opacity 0.5s, visibility 0s linear 0.5s, max-height 0.5s ease-out; /* Smooth transition for max-height */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
backdrop-filter: blur(1.5px);
}
.card-anchor:hover .card-link {
visibility: visible;
opacity: 1;
max-height: 500px; /* Adjust based on the content's maximum height */
transition-delay: 0s; /* Immediate transition effect on hover */  }
.card-link:hover{
background: rgba(255, 0, 0, 1); /* Red color with transparency */
}
            `;
    document.head.appendChild(style);
  
  
  }
  }


    // console.log(props)
    // console.log('props')
  return (
    <div className="container">
      <div className="row">
      {auth ? (
        <AdminCard></AdminCard>
      ):(<div />)}
      {cardMaker}
 
      </div>
    </div>
  );
}

function AdminCard( ) {
  const bac = {
    backgroundImage: 'url(/plus-icon-13062.png)', // Assuming the image is in the public folder
    backgroundSize: 'cover', // Cover the entire div
    backgroundPosition: 'center', // Center the background image

  };
  return (
<a href='/WriteBlog' className='card-anchor' >
<div className="card" style={{position: 'fixed', top: '80%', left: '93%'}}>
        <div class="card-body" style={bac}>
            <p class="card-text">{}.</p>
        </div>
    </div>
</a>
  );
}


export default CardContainer;