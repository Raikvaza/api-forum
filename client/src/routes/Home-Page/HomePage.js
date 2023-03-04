import { useLoaderData } from 'react-router';
import Post from '../../components/Post/Post'

const HomePage = () => {
  const posts = useLoaderData();
  return (
    <div className='home-page-container'>
      {posts && posts.map((post) => {
        return (<Post key={post.PostId} postid={post.PostId} title={post.Title} content={post.Content} date={post.CreationDate} author={post.Author}/>) 
      })}
    </div>
  )
}
export default HomePage;

export const postsLoader = async () => {
  const response = await fetch("http://localhost:8080/api/home", {
        headers: {
          Accept: "application/json",
          Credentials: "include",
        },
        method: "GET",
        credentials: "include",
      });
  if (!response.ok) {
    throw new Error('Could not fetch the list of careers')
  }
  return response.json();
}