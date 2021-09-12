import { Redirect, Route } from "react-router-dom";


const PrivateRoute = ({ component: Component,...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="https://crmapp-fullstack.herokuapp.com/login"/>
        )
      }
    />
  );
};

export default PrivateRoute;