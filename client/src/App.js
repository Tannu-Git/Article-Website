import React, {useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home';
import Blog from './pages/blog';
import WriteBlog from './pages/writeBlog';

const App = () => {

  // const [backendData,setBackendData] = useState([{}])

  // Getting data


// useEffect(()=>{
//   fetch('/api').then(
//     response => response.json().then(
//       data => {
//         setBackendData(data)
//       }
//     )
//   )
// },[])


  // return (
  //   <div>
  //     <p>Hi </p>
  //     {(typeof backendData.user == 'undefined') ? 
  //   (<p>Loading...</p>) : (backendData.user.map((user,i)=>{
  //     return <p key={i}>{user}</p>
  //   }))  
  //   }
  //   </div>
  // );
  
  const [backendData,setBackendData] = useState([])
  const [user,userlogin] = useState(null)
  const [admin,adminGrant] = useState(null)

  useEffect(()=>{

    fetch('/login/success').then((response)=>{
      if(response.status == 200)
        return response.json();
      throw new Error('Failed to login')
    }).then(resObject=>{
      if (resObject && resObject.user) { // Check if resObject and resObject.user exist
        userlogin(resObject.user);
        console.log(resObject.user);
      } else {
        throw new Error('User object is missing in the response');
      }
    }).catch((err) => {
      console.error(err); // Log or handle errors
    });

    fetch('/api').then((response) =>{
      if(response.status == 200)
          return response.json();
        }).then(
        data => {
            setBackendData(data)
            // console.log(data)
        }
        )
    

    fetch('/authorized').then(
      response => response.json().then(
      data => {
          adminGrant(data.authenticated)
          // console.log(data)
      }
      )
  )
    },[])

  return <div>
    <BrowserRouter>
    {(typeof backendData == 'undefined') ? 
    (<p>Loading...</p>) : (
      <Routes>
      <Route path='/' element={<Home props={backendData}  user={user} auth={admin}></Home>}></Route>
      {/* <Route path='/' element={<Home></Home>}></Route> */}
      {backendData.map((data, index) => (
      <Route key={index} path={data.heading} element={<Blog props={{'data': backendData[index],'index':index }} user={user}></Blog>}></Route> 
        ))}

        {(admin) ? (
        <Route path='/WriteBlog' element={<WriteBlog  user={user}></WriteBlog>}></Route>
        ):(
          <Route path='/' element={<Home props={backendData}  user={user} auth={admin}></Home>}></Route>
        )}
    </Routes>
  ) }
    </BrowserRouter>
  </div>
}

export default App;
