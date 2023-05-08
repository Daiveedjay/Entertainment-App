import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

import { useTheme } from "./hooks/useTheme";

function App() {
  const { user, authIsReady } = useAuthContext();

  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <>
          <BrowserRouter>
            <LocationProvider>
              <AppRoutes user={user} />
            </LocationProvider>
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function LocationProvider({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

// eslint-disable-next-line react/prop-types
function AppRoutes({ user }) {
  const location = useLocation();
  const path = location.pathname;
  const showSidebar = path !== "/login" && path !== "/signup" && user !== null;

  return (
    <>
      {showSidebar && <Sidebar />}
      <Routes location={location} key={location.key}>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
