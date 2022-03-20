import { Link, Outlet } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div>Welcome to the Home page</div>
      <Link to="/login">Log in</Link>
      <Outlet />
    </>
  )
}
export default Home
