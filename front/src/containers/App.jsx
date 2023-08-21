import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecoverPass from "../pages/RecoverPass";
import Home from "../pages/Home";

function App() {
    return (  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/recoverpass" element={<RecoverPass/>} />
                <Route path="/home" element={<Home/>} />
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;