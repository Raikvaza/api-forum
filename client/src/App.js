import {
    createBrowserRouter, 
    createRoutesFromElements,
    Route, 
    RouterProvider,
  } from 'react-router-dom'  
  // pages
  import HomePage from './routes/Home-Page/HomePage'
  import SignInPage, { signOutLoader } from './routes/Sign-In-Page/SignInPage'
  import SignUpPage from './routes/Sign-Up-Page/SignUpPage'
  import PostPage from './routes/Post-Page/PostPage'
  import CreatePost from './routes/Create-Post/CreatePost'
  // layouts
  import RootLayout from './layouts/RootLayer/RootLayout'
  //import MainLayout, { checkMain } from './layouts/MainLayout/MainLayout' 
  // loaders
  import { postsLoader } from './routes/Home-Page/HomePage'
  import { postLoader } from './routes/Post-Page/PostPage'
  import { checkAuth } from './utils/Loaders'
  // errorElement
  import { RootBoundary } from './routes/Error-Page/ErrorPage'
  import { PageNotFound } from './routes/Error-Page/PageNotFound'
  
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route element={<RootLayout />} id="root" loader={checkAuth}>
          <Route path="/" errorElement={<RootBoundary/>} >
              <Route index 
                element={<HomePage />}
                loader={postsLoader}
              />
              <Route 
                path="createpost" 
                element={<CreatePost />}
              />
              <Route 
                path="posts"
                element={<PostPage />}
                loader={postLoader}  
              />
              
          </Route>
        <Route path="signin" element={<SignInPage/>} errorElement={<RootBoundary/>} />
        <Route path="signup" element={<SignUpPage/>} errorElement={<RootBoundary/>} />
        <Route path="*" element={<PageNotFound/>} errorElement={<RootBoundary/>} />
      </Route>
    )
  )
  
  function App() {
    return (
      <RouterProvider router={router} />
    );
  }
  
  export default App