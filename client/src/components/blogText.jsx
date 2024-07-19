import React, { useState, useEffect }  from 'react';

function BlogText({props}) {
    // console.log(props.text);
    return (
        <div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-container">
                <div class="text">
                {/* Donot give blog writing access accept admin can cause xss */}
                <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
                </div>
            </div>
        </div>
    </div>

        </div>
    );
}
function BlogTextadmin({props}) {

    async function postData(e){
        e.preventDefault()
        var head = document.querySelector('#head').innerHTML
        var tag = document.querySelector('#tagline').innerHTML
        var outer = document.querySelector('#outer').innerHTML
        var imagee = document.getElementById('imageInput').files[0]
        var input = ''
        if (window.CKEDITOR && window.CKEDITOR.instances.ttext) {
            input = window.CKEDITOR.instances.ttext.getData();
        }
        // Check if input is empty using a more appropriate check for strings
        if(input.trim() === ''){ return; }
        
        // Create a FormData object
        var formData = new FormData();
        formData.append('heading', head);
        formData.append('outer', outer);
        formData.append('text', input);
        formData.append('tagline',tag);
        formData.append('file', imagee); // Append the file
    
        await fetch('http://localhost:3000/addBlog/',
            {
                method:'POST',
                body:formData
            }
        ).then(response=>{
            if(response.ok){
                alert('done')
    }});
    }
    // Set up storage for multer
        useEffect(() => {
            // Dynamically load the CKEditor script
            const script = document.createElement('script');
            script.src = 'https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js';
            script.onload = () => initializeCKEditor();
            document.body.appendChild(script);
        
            return () => {
              // Cleanup: Destroy CKEditor instance on component unmount
              if (window.CKEDITOR) {
                for (let instance in window.CKEDITOR.instances) {
                  window.CKEDITOR.instances[instance].destroy(true);
                }
              }
            };
          }, []);
        
          const initializeCKEditor = () => {
            if (window.CKEDITOR) {
              window.CKEDITOR.replace('ttext');
            }
          };
        

    // console.log(props.text);
    return (
        <div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-container">
                <div class="text">
                {/* Donot give blog writing access accept admin can cause xss */}
                <div contentEditable='true' >
                    <p id='ttext'>Write your Blog</p>
                </div>
            </div>
        </div>
        <div class="col-md-8 text-container mt-3">
                <div class="text">
                {/* Donot give blog writing access accept admin can cause xss */}
                <div contentEditable='true' >
                    <p id='outer'>Write card line</p>
                </div>
            </div>
        </div>
            {/* Image Upload Input */}
    <div class="col-md-8 text-container mt-3">
        <input type="file" required accept="image/*" id="imageInput" />
    </div>
</div>
<button type="button" class="btn btn-primary" onClick={postData} style={{position: 'fixed', top: '80%', left: '90%', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
   <img src="pngtree-3d-tick-sign-icon-png-image_9225323.png" alt="" style={{maxWidth: '150%', maxHeight: '150%'}} />
</button>
</div>

        </div>
    );
}

export default BlogText;
export {BlogTextadmin}