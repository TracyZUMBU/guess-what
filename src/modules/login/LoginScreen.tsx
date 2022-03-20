import { Link, useNavigate } from "react-router-dom";
import { Button } from "../constants/button/Button";
import { Box } from "../constants/containers/Containers";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <h1>Login Page</h1>
      <Link to="/">Log out</Link>
      <Button onClick={() => navigate("/")} label="quit" />
    </Box>
  );
};

export default Login;
