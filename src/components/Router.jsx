import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home"
import Books from "./Books";
import Login from "./Login";
import Register from "./Register"
import SingleBook from "./SingleBook"

export default function Router() {
  const [token,setToken]=useState(null)
  
  return (
    <div id="router">
      <Routes>
        <Route path="/" element={<Home setToken={setToken}/>}></Route>
        <Route path="/Books" element={<Books/>}></Route>
        <Route path="/Login" element={<Login setToken={setToken}/>}></Route>
        <Route path="/Register" element={<Register setToken={setToken}/>}></Route>
        <Route path="/Books/:id" element={<SingleBook token={token} />}></Route>
      </Routes>
    </div>
  );
}
