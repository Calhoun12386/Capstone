import { Routes, Route } from "react-router-dom";
import Home from "../components/Home"
import Books from "./Books";
import Login from "./Login";

export default function Router() {
  return (
    <div id="router">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Books" element={<Books/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}
