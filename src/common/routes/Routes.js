import Dash from "../components/Dash";
import Landing from "../components/Landing";
import Register from "../components/Register";
import Login from "../components/Login";

export default [
  {
    component: Landing,
    path: "/",
    exact: true
  },
  {
    component: Dash,
    path: "/dash"
  },
  {
    component: Register,
    path: "/register"
  },
  {
    component: Login,
    path: "/login"
  }
];
