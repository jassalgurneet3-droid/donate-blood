import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import BecomeDonor from "./pages/BecomeDonor";
import BloodCompatibility from "./pages/BloodCompatibility";
import NearbyCentres from "./pages/NearbyCentres";
import Auth from "./pages/Auth";
import SignupForm from "./pages/SignupForm";
import EligibilityCheck from "./pages/EligibilityCheck";
import NotFound from "./pages/NotFound";
import Education from "../app/pages/Education";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "become-donor", Component: BecomeDonor },
      { path: "blood-compatibility", Component: BloodCompatibility },
      { path: "nearby-centres", Component: NearbyCentres },
      
      { path: "education", Component: Education }, 

      { path: "auth", Component: Auth },
      { path: "signup", Component: SignupForm },
      { path: "eligibility", Component: EligibilityCheck },
      { path: "*", Component: NotFound },
    ],
  },
]);
