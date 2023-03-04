import './Comment.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';

function CommentComponent(props) {
  return (
    <div className='comment-container'>
        {/* Header */}
        <div className='comment-header'>
          <div className='comment-header-date'>
            <p>Creation-Date: {props.date}</p>
          </div>
          <div className='comment-header-title'>
            <h3>O_O</h3>
          </div>
          <div className='comment-header-author'>
            <p>Author: {props.author}</p>
          </div>
        </div>
  
        {/* Body  */}
        <div className='comment-body'>
          <p>{props.content}</p>
        </div>
  
        {/* Footer */}
        <div className='comment-footer'>
          <div className='comment-footer-comments'>
            Some data for the future
          </div>
  
          <div className='comment-footer-likes'>
            <div className='comment-footer-likes-icons'>
              <ThumbUpIcon />
              <p>Like</p>
              <ThumbDownIcon />
              <p>Dislike</p>
            </div>
          </div>
        </div> 
    </div>
  );
}
export default CommentComponent;