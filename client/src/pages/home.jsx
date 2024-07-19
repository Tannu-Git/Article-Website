import React, { useState, useEffect }  from 'react';
import '../css/common.css'
import '../css/main.css'
import  '../js/main.js'
import starfishAdder from '../js/fish.js';
import Header from '../components/header.jsx'
import CardContainer from '../components/card.jsx'
import grainMaker,{cursorMaker} from '../js/main.js';

function Home({props,user,auth}) {
    useEffect(() => {
        grainMaker()
        starfishAdder(10,12,'fixed')
        // {cursorMaker()}
        document.body.style.background = "linear-gradient(to bottom, #ffe8b1 0%, #e0c98e 50%, #deb572d4 100%) no-repeat center center fixed"

     });
    return (
        <div onLoadedData={cursorMaker()}>
            <Header video='waves_seamless_loop.mp4'  user={user} ></Header>
            <div className="grains"></div>
            {/* easy use on load data and a if in js to check if it is loaded */}
            <video class="cursor-video" id="cursorVideo" muted loop >
                <source src="cursor.webm" type="video/webm" /> 
                Your browser does not support the video tag.
            </video>    
          <CardContainer props ={props} auth={auth}></CardContainer>  
        </div>
    );
}

export default Home;