import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from "axios";
import Signup from "../../pages/Signup";
import Home from '../../pages/Home';
import Login from "../../pages/Login";
import Restaurant from "../../pages/Restaurant";
import ReadPlats from "../ReadPlats";


const route = () => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token;
    console.log(axios.defaults.headers.common['Authorization']);
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element = {<Signup />} />
            <Route path ="/" element = {<Home />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/restaurant" element = {<Restaurant />} />
            <Route path="/restaurants/:id" element = {<ReadPlats />} />
        </Routes>
        </BrowserRouter>
    )
}
 export default route;