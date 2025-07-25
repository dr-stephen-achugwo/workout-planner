//App.js

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Entries from "./pages/Entry/Entries";
import Routines from "./pages/Routine/Routines"
import { useContext } from "react";
import { AuthContext } from "./authContext";
import Home from "./pages/home/Home";
import Meal from "./pages/Meal/Meal";


function App() {
    const { user } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Login title="Login to Create" />;
        } else {
            return children;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/entries" element={<ProtectedRoute><Entries /></ProtectedRoute>} />
                <Route path="/meals" element={<ProtectedRoute><Meal /></ProtectedRoute>} />
                <Route path="/routines" element={<ProtectedRoute><Routines /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;