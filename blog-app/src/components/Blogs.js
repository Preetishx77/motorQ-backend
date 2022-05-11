import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, getBlog, setEdit, updateBlog } from "./../redux/features/PostSlice";

const Blogs = () => {
  const [id, setId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textBody, setTextBody] = useState("");
  const { loading,post, body, edit,posts } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
 

    if (body) {
      setTextBody(body);
    }
  }, [body,dispatch]);

  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
    alert("Please Provide Post ID");
    } else {
    dispatch(getBlog({ id }));
      setId("");
    }
  };

  const handleDelete = ({ id }) => {
    dispatch(deleteBlog({ id: post[0].id }));
    window.location.reload();
    alert('Post Deleted');
  };

  return (
    <>
      <ul>
        <li ><h3>Blogs App</h3></li>
        <li style={{ float: 'right' }}><button className='btn'><h3>Get Blogs</h3></button></li>
        <li style={{ float: 'right' }}><button className='btn' onClick={() => navigate('/addblog')}><h3>Add Blog</h3></button></li>


      </ul>
      <div className="search-container">
        hint - put blog id between 1 - 100
        <form action="">
          <input type="text" 
          placeholder="Search By Id" 
          name="search"
          value={id}
          onChange={(e) => setId(e.target.value)} />
          <button type="submit" onClick={handleFetchData}><i className="fa fa-search"></i>Search</button>
        </form>

        {
          loading ? (<><p>Loading...</p></>) : (
            <>
            {
              post.length > 0 && (
                <>
                <div className='blog-container'>
                  <div className='header-text'>
                    <h3>{post[0].title} </h3>
                  </div>
                  {
                    edit  === true ? (
                      <>
                      <textarea
                        className="form-control"
                        value={textBody}
                        style={{width:'100%'}}
                        onChange={(e) => setTextBody(e.target.value)}
                        id="floatingTextarea"
                      />
                      <div className="search-container">
                        <button
                          className=""
                          onClick={() => {
                            dispatch(
                              updateBlog({
                                id: post[0].id,
                                title: post[0].title,
                                body: textBody,
                              })
                            );
                            dispatch(setEdit({ edit: false, body: "" }));
                          }}
                        >
                          Save
                        </button>
                        <button
                          className=""
                          onClick={() =>
                            dispatch(setEdit({ edit: false, body: "" }))
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                    ) : (<>
                    <div className='body-text'>
                    <p>{post[0].body}</p>
                    </div>
                    </>)
                  }
                                      {!edit && (
                      <div className="">
                        <button
                          className=""
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className=""
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
              

                </div>
                </>
              )
            }
            </>
          )
        }
      </div>
      {
       console.log(posts)
      }
    </>
  )
}

export default Blogs