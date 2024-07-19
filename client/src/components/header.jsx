import React from 'react';

function Header({video,user,props}) {
    // console.log({video});
    return (
        <div>
           <Navbar  user={user}></Navbar>
            <Hero video={video} props={props}></Hero>
        </div>
    );
}

function Headeradmin({video,user}) {
    // console.log({video});
    return (
        <div>
           <Navbar  user={user}></Navbar>
            <HeroAdmin video={video}></HeroAdmin>
        </div>
    );
}



function Navbar({user}) {
    function googleAuth() {
        window.open(
            'http://localhost:5000/auth/google/',
            "_self"
        )
    }
    function Logout() {
        window.open(
            'http://localhost:5000/Logout',
            "_self"
        )
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg" alt="" className="img-fluid" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact us</a>
                        </li>
                        {user ? (
                            <li className="nav-item">
                            <a className="nav-link" onClick={Logout} href='#'>Logout</a>
                            </li>
                        ) : (
                            <li className="nav-item">
                            <a className="nav-link" onClick={googleAuth} href='#'>Login</a>
                            </li>
                        )}
                        
                    </ul>
                </div>
            </nav>
        </div>
    );
}

function Hero({video,props}){
    return(
        <div>
                <div className="heading-container text-center">
                    {props ? (
                     <div>
                     <h1 className="display-4">{props.heading}</h1>
                     <h2 className="tagline">{props.tagline}</h2> 
                 </div>
                    ) : (
                        <div>
                            <h1 className="display-4">Sans Luis</h1>
                            <h2 className="tagline">Experience the Serenity</h2> 
                        </div>
                    )
                    }

    </div>
        <video className="video-background masked-element" autoPlay muted loop id="myVideo">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
}


function HeroAdmin(props){
    return(
        <div>
                <div className="heading-container text-center">
        <h1 className="display-4" contentEditable="true" id='head'>Sans Luis</h1>
        <h2 className="tagline" contentEditable='true' id='tagline'>Experience the Serenity</h2> 
    </div>
        <video className="video-background masked-element" autoPlay muted loop id="myVideo">
            <source src={props.video} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
}

export default Header ;
export {Headeradmin}