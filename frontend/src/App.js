import React from "react";
// We use Route in order to define the different routes of our application
import { Navigate, Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import MbtaAlertsPage from "./components/pages/mbtaAlerts";
import MbtaMyFavorite from "./components/pages/mbtaFavorite";
import MbtaMyComment from "./components/pages/mbtaComment";
import MbtaMyRating from "./components/pages/mbtaRating";
import MbtaSchedule from "./components/pages/Schedule";
import StationManagers from "./components/pages/StationManager";
import MbtaLiveMap from "./components/pages/LiveMap";
import MbtaStop from "./components/pages/mbtaStop";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/landing" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route exact path="/mbtaAlerts" element={<MbtaAlertsPage />} />
          <Route exact path="/Schedule" element={<MbtaSchedule />} />
          <Route exact path="/mbtaFavorite" element={<MbtaMyFavorite />} />
          <Route exact path="/mbtaComment" element={<MbtaMyComment /> }/>
          <Route exact path="/mbtaRating" element={<MbtaMyRating />}/>
          <Route exact path="/StationManager" element={<StationManagers />}/>
          <Route exact path="/LiveMap" element={<MbtaLiveMap />}/>
          <Route exact path="/mbtaStop" element={<MbtaStop />}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App
