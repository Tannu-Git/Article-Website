import React, { useState, useEffect } from 'react';
import '../css/common.css'
import '../css/blog.css'
import '../js/blog.js'
import { videoBg, cursorMaker, textOnSand } from '../js/blog.js';
import starfishAdder from '../js/fish.js';
import Header from '../components/header.jsx'
import BlogText from '../components/blogText.jsx'
import Comment from '../components/comment.jsx'

function Blog({props,user}) {
    useEffect(() => {
        starfishAdder(18,25,'absolute')
        {textOnSand()}
        {videoBg()}
        // {ckeditorr()}
        {cursorMaker()}
     });
    //  console.log(props)
    return (
        <div>
            <Header video='waters.mp4' user={user} props={props.data}></Header>
            <div className='brain' >My brain is not braining </div>
            <img id="custom-cursor" class="custom-cursor" src="normal.png" alt="Cursor" /> 
            <BlogText props={props.data}></BlogText>
            <Comment props={props} user={user}></Comment>
        </div>
    );
}

export default Blog;