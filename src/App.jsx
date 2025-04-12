import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-books" element={<MyBooks />} />
        {/* <Route path="/recommendation" element={<Recommendation />} /> */}
      </Routes>
    </>
  );
}

export default App;
