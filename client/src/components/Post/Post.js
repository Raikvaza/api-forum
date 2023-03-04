import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Post.css'
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
function Post(props) {
    const userData = useSelector((state) => state.auth.username);
    const location = useLocation();
    const { pathname } = location;
    const [comment, setComment] = useState('');
    const [isActive, setIsActive] = useState(true)
    
    const handleNewComment = () => { //Toggling Add comment button
      setIsActive(current => !current)
      console.log(isActive);
    }
    const sendComment = async (event) => {
      event.preventDefault();
        try{
          const response = await fetch('http://localhost:8080/api/createComment', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              author: userData,
              body: comment,
              postId: parseInt(props.query)
            }),
          });
          if (response.status === 401) {
            throw new Error('You are not authorized for post creation');
          }
          if (!response.ok) {
            throw new Error('Error while creating the post');
          }
        }catch (error) {
          return 
        }
      }

    return (
      <>
      <div className='post-container'>
        {/* Header */}
        <div className='post-header'>
          <div className='post-header-date'>
            <p>Creation-Date: {props.date}</p>
          </div>
          <div className='post-header-title'>
            <h3>{props.title}</h3>
          </div>
          <div className='post-header-author'>
            <p>Author: {props.author}</p>
          </div>
        </div>
        
        {/* Body */}
        <div className='post-body'>
            <p>{props.content}</p>
        </div>
        
        {/* Footer */}
        <div className='post-footer'>
          {pathname==='/'? (
            <div className='post-footer-comments'>
            <Link
              to={{
                pathname: `/posts/`,
                search: `?id=${props.postid.toString()}`
              }}
              className='link-style'
            >
              <CommentIcon/> Comments
              </Link>
            </div>
            ) : 
            <div className='post-footer-comments'>
              Some data for the future
            </div> 
          }
          
          
          {pathname!=='/' && userData!==null && 
            <div className='post-footer-add-comment'>
                <AddCircleOutlineIcon
                  fontSize='large'
                  onClick={handleNewComment}
                  className='add-comment-button'
                />
            </div>
          }  
          
          <div className='post-footer-likes'>
            <div className='post-footer-likes-icons'>
            <ThumbUpIcon/><p>Like</p>
            <ThumbDownIcon/><p>Dislike</p>
            </div>
          </div>
        </div>
        
        {/* Input Form for a new comment */}
      </div>
      { userData!==null && pathname!=="/" &&
      <div className='add-comment-input'>
      <form className='add-comment-form'>  
        <TextField 
          id="filled-basic"
          label="Add Comment"
          sx={{
            backgroundColor:"white",
            borderRadius: "10px",
            width: "90vw",
            height: "100%"
          }}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* <Button
          variant="contained"
          sx={{height:"100%"}}
          startIcon={<SendIcon />}
          onClick={sendComment}
        /> */}
        <button class="custom-btn btn-15" onClick={sendComment}>Add</button>
        </form>
    </div>
    }
    </>
    );
  }
export default Post;