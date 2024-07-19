import React, { useState, useEffect }  from 'react';
import '../css/common.css'
import starfishAdder from '../js/fish.js';
import {Headeradmin} from '../components/header.jsx'
import {BlogTextadmin} from '../components/blogText.jsx';

function WriteBlog({user}) {
    useEffect(() => {
        starfishAdder(10,12,'fixed')
        // document.body.style.background = 'url("sandy-grained-beige-stucco.jpg")'
        document.querySelector('.video-background').style.maskImage = "linear-gradient(to bottom, rgba(0, 0, 0, 1)80%, rgba(0, 0, 0, 0))";});
    return (
        <div>
            <Headeradmin video='10540776-uhd_2560_1440_30fps.mp4'  user={user}></Headeradmin>
            <BlogTextadmin></BlogTextadmin>
        </div>
    );
}

export default WriteBlog;