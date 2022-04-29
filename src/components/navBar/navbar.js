import logo from "./logo.png";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo}></img>
      <h1>Crops</h1>
    </div>
  );
}

export default Navbar;
