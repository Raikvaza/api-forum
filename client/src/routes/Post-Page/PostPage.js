import { useLoaderData, useLocation, useParams } from 'react-router';
import Post from '../../components/Post/Post';
import CommentComponent from '../../components/Comment/Comment';
import './PostPage.css'
const PostPage = () => {
  // const { id } = useParams();
  // console.log(id);
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const {post, comments} = useLoaderData();
  console.log(post);
  return (
    <div className='main-container'>  
      <Post key={post.PostId} query={id} postid={post.PostId} title={post.Title} content={post.Content} date={post.CreationDate} author={post.Author}/>
      <div className='comments-header'>Comments</div>
      <div className='comments-container'>
        { comments &&
          comments.map(comment =>{
            return (
              <CommentComponent key={comment.CommentID} date={comment.CreationDate} author={comment.Author} content={comment.Body}/>
            )        
          })
        }
      </div>
    </div>
  )
}
export default PostPage;


export const postLoader = async ({request}) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get('id');
    
  const [postResponse, commentsResponse] = await Promise.all([
    fetch(`http://localhost:8080/api/getpost/?id=${id}`, {
      headers: {
        Accept: "application/json",
        Credentials: "include",
      },
      method: "GET",
      credentials: "include",
    }),
    fetch(`http://localhost:8080/api/getComments/?id=${id}`, {
      headers: {
        Accept: "application/json",
        Credentials: "include",
      },
      method: "GET",
      credentials: "include",
    })
  ]);

    // const response = await fetch(`http://localhost:8080/api/getpost/?id=${id}`, {
    //   headers: {
    //     Accept: "application/json",
    //     Credentials: "include",
    //   },
    //   method: "GET",
    //   credentials: "include",
    // })
    
    if (!postResponse.ok) {
      throw Error('Could not fetch the post');
    }
  
    if (!commentsResponse.ok) {
      throw Error('Could not fetch the comments');
    }
  
    const post = await postResponse.json();
    const comments = await commentsResponse.json();
  
    return { post, comments };
}



