import "./home.css";
import profilePhoto from "../assets/myPhoto.jpg";

function Home() {
  return (
    <section className="homeSection">
      <div className="homeText">
        <h1>Hi, I'm Ivar</h1>
        <h2>Full-Stack Developer & 3D Enthusiast</h2>
        <p>
          Passionate about building modern web applications and creating stunning 3D models.
          Skilled in JavaScript, React, Java, and backend technologies.
        </p>   
      </div>
      <div className="homeImage">
        <img src={profilePhoto} alt="Profile" className="profilePhoto" />
      </div>
    </section>
  );
}

export default Home;