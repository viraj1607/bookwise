import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Recommendations from "./pages/Recommendations";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/my-books"
          element={
            <PrivateRoute>
              <MyBooks />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <PrivateRoute>
              <Recommendations />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-info"
          element={
            <PrivateRoute>
              <UserInfo />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
