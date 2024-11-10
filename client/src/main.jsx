import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Pets from "./pages/Pets.jsx";
import PetDetails from "./pages/PetDetails.jsx";
import Shelters from "./pages/Shelters.jsx";
import "./index.css";
import ShelterDetails from "./components/ShelterDetails.jsx";
import SignupPage from './pages/SignupPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signupPage",
        element: <SignupPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/pets",
        element: <Pets />,
      },
      {
        path: "pet/:id",
        element: <PetDetails />,
      },
      {
        path: "/shelters",
        element: <Shelters />,
      },
      {
        path: "/shelter/:id",
        element: <ShelterDetails />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
