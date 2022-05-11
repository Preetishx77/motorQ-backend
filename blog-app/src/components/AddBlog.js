import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "./../redux/features/PostSlice";

const AddBlog = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };


  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
         <>Loading...</>
        ) : (
          <div className="">
            <div className="">
              <h5 className="">{post[0].title}</h5>
              <p className="">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
      <>
    <ul>
    <li ><h3>Blogs App</h3></li>
    <li style={{ float: 'right' }}><button className='btn' onClick={() => navigate('/')}><h3>Get Blogs</h3></button></li>
    <li style={{ float: 'right' }}><button className='btn' onClick={() => navigate('/addblog')}><h3>Add Blog</h3></button></li>


  </ul>
    <div>
     
      <form action="" className="search-container">
      <h1 className="">Create Post </h1>
        <div >
            
            <label for="title" style={{fontWeight:'bolder'}}>Post Title</label>
            <br />
          <input
            type="text"
            value={title}
            style={{marginTop:'30px'}}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Enter Post Title"
            className="form-control"
            id=""
          
          />
        </div>
        <div style={{marginTop:'30px'}}>
            
            <label for="category" style={{fontWeight:'bolder'}}>Post Categories</label>
            <br />
          <input
            type="text"
            style={{marginTop:'30px'}}
            placeholder="Enter Post Category"
            className="form-control"
            id="category"
          
          />
        </div>
        <div className="form-floating"  style={{marginTop:'30px'}}>
        <label for="title" style={{marginRight:'40px',fontWeight:'bolder'}}>Post description</label>
        <br />
          <input
            className="form-control"
            value={body}
            style={{marginTop:'30px'}}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            placeholder="add post description"
            id="Textarea"
          />
        
        </div>
        <div className=""  style={{marginTop:'30px'}}>
      
          <button
            className=""
            type="submit"
            onClick={handleSubmit}
          >
            submit
          </button>
          <button className="" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </form>
      <div className="" style={{marginLeft:'3rem'}}>{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
    </>
  );
};

export default AddBlog;