import { Link } from "react-router-dom";
import profilePhoto from "../assets/profile_photo.jpg";

function Hero() {
  return (
    <section id="home">
      <img
        src={profilePhoto}
        alt="Garvit Pujari"
        className="profile-photo"
      />

      <p>Hi, I'm</p>

      <h1>Garvit Pujari</h1>

      <h2>AI/ML Engineer & Generative AI Developer</h2>

      <p>
        I build intelligent systems using Machine Learning,
        Generative AI, Computer Vision and Agentic AI.
      </p>

      <p>Have questions about me?</p>

      <div>
        <Link to="/chat">
          <button>Ask KnowMe AI</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;