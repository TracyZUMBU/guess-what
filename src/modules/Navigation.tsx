import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/HomeScreen";
import Login from "./login/LoginScreen";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home/*" element={<Home />}>
        {/*  */}
        <Route path="new-user" element={<p>Hey You're new ! Log in</p>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
