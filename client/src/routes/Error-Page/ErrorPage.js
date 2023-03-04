import { useRouteError } from "react-router";
import { isRouteErrorResponse } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import './ErrorPage.css'

export const RootBoundary = () => {
    const error = useRouteError();
    console.log("ERROR OCCURED");
    
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return (
          <div className="error-container">
            <div className="error-header">Error</div>
            <div className="error-message">This Page does not exist</div>
          </div>
        )
      }
  
      if (error.status === 401) {        
        console.log("ERROR 401");
        return (
          <div className="error-container">
            <div className="error-header">Error</div>
            <div className="error-message">You aren't authorized to see this</div>
          </div>
        )
      }
  
      if (error.status === 503) {
        return (
        <div className="error-container">
            <div className="error-header">Error</div>
            <div className="error-message">Looks like our API is down</div>
        </div>
        )
      }
  
      if (error.status === 418) {
        return <div>🫖</div>;
      }
    }
    console.log(error.message);
    return (
      <div className="error-container">
        <div className="error-header">Error</div>
        <div className="error-message">Something went wrong: {error.message}</div>
      </div>
    )
}