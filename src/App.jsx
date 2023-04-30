// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   useLocation,
//   Navigate,
// } from "react-router-dom";

// import "./App.css";
// import { AnimatePresence } from "framer-motion";

// import Home from "./pages/home/Home";
// import Movies from "./pages/movies/Movies";
// import Series from "./pages/series/Series";
// import Bookmarks from "./pages/bookmarks/Bookmarks";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/login/Login";
// import Signup from "./pages/signup/Signup";
// import { useAuthContext } from "./hooks/useAuthContext";
// function App() {
//   const { user, authIsReady } = useAuthContext();
//   return (
//     <div className="App">
//       {authIsReady && (
//         <>
//           <BrowserRouter>
//             <LocationProvider>
//               <RoutesWithAnimation user={user} />
//             </LocationProvider>
//           </BrowserRouter>
//         </>
//       )}
//     </div>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function LocationProvider({ children }) {
//   return <AnimatePresence>{children}</AnimatePresence>;
// }

// // eslint-disable-next-line react/prop-types
// function RoutesWithAnimation({ user }) {
//   const location = useLocation();
//   const path = location.pathname;
//   const showSidebar = path !== "/login" && path !== "/signup" && user !== null;

//   return (
//     <>
//       {showSidebar && <Sidebar />}
//       <Routes location={location} key={location.key}>
//         {user ? (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/bookmarks" element={<Bookmarks />} />
//             <Route path="/movies" element={<Movies />} />
//             <Route path="/series" element={<Series />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//         <Route
//           path="/signup"
//           element={user ? <Navigate to="/" /> : <Signup />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

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

function App() {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>
        <LocationProvider>
          <AppRoutes user={user} />
        </LocationProvider>
      </BrowserRouter>
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

  // if (user === undefined) return <div>Loading...</div>;

  // return (
  //   <>
  //     {user && showSidebar && <Sidebar />}
  //     <Routes location={location} key={location.key}>
  //       <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
  //       <Route
  //         path="/bookmarks"
  //         element={user ? <Bookmarks /> : <Navigate to="/login" />}
  //       />
  //       <Route
  //         path="/movies"
  //         element={user ? <Movies /> : <Navigate to="/login" />}
  //       />
  //       <Route
  //         path="/series"
  //         element={user ? <Series /> : <Navigate to="/login" />}
  //       />
  //       <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
  //       <Route
  //         path="/signup"
  //         element={user ? <Navigate to="/" /> : <Signup />}
  //       />
  //       <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
  //     </Routes>
  //   </>
  // );
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

// TODO -.-

// return (
//   <>
//     {showSidebar && <Sidebar />}
//     <Routes location={location} key={location.key}>
//       {user && (
//         <>
//           <Route path="/" element={<Home />} />
//           <Route path="/bookmarks" element={<Bookmarks />} />
//           <Route path="/movies" element={<Movies />} />
//           <Route path="/series" element={<Series />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </>
//       )}

//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//     </Routes>
//   </>
// );
