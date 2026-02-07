import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Layout/LandingPage";
import Stores from "../pages/Stores";
import Franchise from "../pages/Franchise";
import CustomizeProduct from "../pages/CustomizeProduct";
import MainCont from "../pages/MainCont";
import GalleryShowCase from "../pages/GalleryShowCase";
import LoadedImg from "../pages/LoadedImg.jsx"
import Login from '../pages/LogIn/Login.jsx'
import AdminPage from '../pages/AdminPanel/AdminPage.jsx'
import Fag from "../pages/Fag.jsx";
import TermsAndCondition from "../pages/termsAndCondition.jsx";
import OurStory from "../pages/OurStory.jsx";
import PrivacyAndPolicy from "../pages/PrivacyAndPolicy.jsx"
import Blogs from "../pages/Blog.jsx"
import AboutUS from "../pages/AboutUs.jsx"
import PrivateRoute from "./PrivateRoutes.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        index:true,
        element: <MainCont />,
      },
      {
        path: "Gallery",
        element: <GalleryShowCase/>,
      },
      {
        path: "Stores",
        element: <Stores />,
      },
      {
        path: "Franchise",
        element: <Franchise />,
      },
      {
        path: "Customization",
        element: <CustomizeProduct />,
      },
      {
        path: "Jewellery",
        element: <LoadedImg />,
      },
      {
        path: "faq",
        element: <Fag />,
      },
      {
        path: "termAndCondition",
        element: <TermsAndCondition />,
      },
      {
        path: "ourStory",
        element: <OurStory />,
      },
      {
        path: "privacyAndPolicy",
        element: <PrivacyAndPolicy />,
      },
      {
        path: "blog",
        element: <Blogs />,
      },
      {
        path: "about",
        element: <AboutUS />,
      }
    ],

  },
  
  {
    path:"/login",
    element: <Login/>,
  },
 {
  path: "/admin",
  element: (
    <PrivateRoute>
      <AdminPage />
    </PrivateRoute>
  ),
},

]);

export default router;
