import React,{useState} from 'react';

const Comment = ({props,user}) => {
    // console.log(user);
    function googleAuth() {
        window.open(
            'http://localhost:5000/auth/google/',
            "self"
        )
    }

  const [commenta,cahngeCommenta] = useState(
    props.data.comment.map((data,index)=>(
        <div key={index} >
        <div className="comment d-flex align-items-start mb-3">
                                <img src={data.img} class="rounded-circle mr-3" alt={props.data.person} width="50" height="50" />
                                <div className="comment-text">
                                    <p className="person-heading mb-2">{data.person}</p>
                                    <p>{data.comments}</p>
                                </div>
                                </div>
        </div>
        ))
  )


  

    async function postData(e){
        e.preventDefault()
        var input = document.getElementById('comment-editor')
        if(input.value == ''){return}
        const res = await fetch('http://localhost:3000/comments/',
            {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },body: JSON.stringify({
                    parcel : {
                        "heading":props.data.heading,
                        "comment":input.value}
                })
            }
        ).then((response)=>response.json()).then((datae)=>{
             // When it is done re-render comment section using usestate and getting data from server as response
             const newData = datae.text[props.index];
            cahngeCommenta(
                newData.comment.map((data,index)=>(
                    <div key={index} >
                    <div className="comment d-flex align-items-start mb-3">
                                            <img src={data.img} class="rounded-circle mr-3" alt={newData.person} width="50" height="50" />
                                            <div className="comment-text">
                                                <p className="person-heading mb-2">{data.person}</p>
                                                <p>{data.comments}</p>
                                            </div>
                                            </div>
                    </div>
                    ))
            )

        })
    }
    return (
        <div>
    <div class="container">
        <div class="row">
            <div class="col-md-8 comment-section">
                <h3>Comments</h3>
                <div id="comments">
                    {/* <!-- Random comments will be inserted here --> */}

                    {commenta}

                </div>
{user ? (
    <div class="comment-editor-container">
    <textarea id="comment-editor" class="form-control" rows="5" placeholder="Write your comment..."></textarea>
    <button id="submit-comment" class="btn btn-success mt-2" onClick={postData}>Post Comment</button>
</div> 
):(
    <div class="comment-editor-container">
    <textarea id="comment-editor" class="form-control" rows="5" placeholder="Write your comment..." disabled></textarea>
    <button id="submit-comment" class="btn btn-success mt-2" disabled>Post Comment</button>
    <p class="text-muted mt-2">Please <a  onClick={(e) => { e.preventDefault(); googleAuth(); }} href={props.data.heading}>login</a> to comment.</p>
</div>
)}
   
        </div>
        </div>
    </div>
        </div>
    );
};

export default Comment;