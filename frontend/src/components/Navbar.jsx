import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Garvit Pujari</h2>

      <div>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
      <Link to="/chat">           
               
      <button>Ask KnowMe AI</button>
      </Link>
    </nav>
  );
}

export default Navbar;