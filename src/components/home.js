import "./home.css";
import profilePhoto from "../assets/profile1.jpg";
import cvFile from "../assets/Ivar_Mihhailov_Resume.pdf";

function Home() {
  return (
    <section className="homeSection">
      <div className="homeText">
        <h1>Hi, I'm Ivar</h1>
        <h2>Full-Stack Developer & 3D Enthusiast</h2>
        <p>
          Passionate about building web applications using React, Javascript, GO and Java.
          As a hobby, I enjoy creating 3D models, primarily using Blender.
        </p>
        <a href={cvFile} download className="cvButton">Download My CV</a>
      </div>
      <div className="homeImage">
        <img src={profilePhoto} alt="Profile" className="profilePhoto" />
      </div>
    </section>
  );
}

export default Home;
