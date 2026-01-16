import React from "react";
// import { Route, Navigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import { secureStorage } from "../utils/secureStorage";

const ProtectedRoute = ({ allowedRoles }) => {
  const isLoggedIn = secureStorage.get("isLoggedIn");
  //const activeRole = secureStorage.get("ActiveRole")?.toLowerCase()?.trim();
  const activeRole = useSelector(state => state?.userProfileInfo?.profileObj).role.toString();
  // const userRolesRaw = JSON.parse(secureStorage.get("UserRoles") || "[]");
  const userRolesRaw = secureStorage.get("UserRoles") || [];
  

const userRoles = userRolesRaw
  .map(r => r.toString().trim());


  if (!isLoggedIn) {
    message.warning("Please login to access this page.");
    return <Navigate to="/login" replace />;
  }

 
//   if (!allowedRoles.includes(activeRole)) {
//     message.error("Access denied. You do not have permission to view this page.");

    
//   // Clear session data
//     //secureStorage.clear();
    
//  secureStorage.remove("ActiveRole");
//     secureStorage.remove("token");


//     return <Navigate to="/login" replace />;
//   }


const hasUserRole = userRoles.includes(activeRole);
  const hasRouteAccess = userRoles.some(role => allowedRoles.includes(role));


  if (!hasUserRole) {
    message.error("You do not have this role assigned. Please switch to a valid role.");
    return <Navigate to="/login" replace />;
  }

  if (!hasRouteAccess) {
    message.error("Access denied. You do not have permission to view this page.");
    secureStorage.clear();
    return <Navigate to="/login" replace />;
  }



  return <Outlet />;
};

// const ProtectedRoute = ({ auth,component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (auth) return <Component {...props} />;
//         if (!auth)
//           return (
//             <Navigate to={{ path: "/", state: { from: props.location } }} />
//           );
//       }}
//     />
//   );
// };


export default ProtectedRoute;