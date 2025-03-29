import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Messages from "./pages/Messages"
import Onboarding from "./pages/Onboarding"
import NotFound from "./pages/NotFound"

const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/dashboard",
    protected: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    protected: true,
  },
  {
    path: "/profile",
    component: Profile,
    protected: true,
  },
  {
    path: "/profile/:userId",
    component: Profile,
    protected: true,
  },
  {
    path: "/messages",
    component: Messages,
    protected: true,
  },
  {
    path: "/onboarding",
    component: Onboarding,
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    protected: false,
  },
  {
    path: "/register",
    component: Register,
    protected: false,
  },
  {
    path: "*",
    component: NotFound,
    protected: false,
  },
]

export default routes;