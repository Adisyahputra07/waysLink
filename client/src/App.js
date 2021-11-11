import React from "react";
import { UserContext } from "./context/userContext";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import { Switch, Route, useHistory } from "react-router-dom";

// components
import LandingPage from "./pages/LandingPage/LandingPage";
import PrivateRoute from "./components/Private/PrivateRoute";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import MyLink from "./pages/MyLink/MyLink";
import CreateTemplate from "./pages/CreateTemplate/CreateTemplate";
import Brand from "./pages/Brand/Brand";

function App() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }

      setAuthToken(token);

      const getProfile = await API.get("/profile");

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { ...getProfile.data.data },
      });

      history.push("/home");
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-link" component={MyLink} />
        <PrivateRoute exact path="/create-template" component={CreateTemplate} />
        <PrivateRoute exact path="/brand/:id" component={Brand} />
      </Switch>
    </div>
  );
}

export default App;
