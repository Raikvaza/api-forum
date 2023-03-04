import { Outlet, NavLink, ScrollRestoration } from "react-router-dom"
import Header from "../../components/Header/Header";
// import Breadcrumbs from "../components/Breadcrumbs"
import '../MainLayout/MainLayout.css'
export default function RootLayout() {
    
  // const userData = useSelector((state) => state.auth.username);
  // const dispatch = useDispatch();
  // useEffect(() => {
  // }, [])
  return (
    <div className="main-layout">
        <nav>
            <Header/>
        </nav>
        <main>
            <div className="body-container">
                <div className="body-posts-container">
                    <Outlet />
                </div>
            </div>
        </main>
    </div>
  )
}