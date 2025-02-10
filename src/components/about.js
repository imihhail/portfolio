import "./about.css";
import profilePhoto from "../assets/myPhoto.jpg";

function About() {
  return (
    <div className="aboutSection">
      <img
        src={profilePhoto}
        alt="Profile"
        className="profilePhoto"
      />
      <h2>About Me</h2>
      <p>
        I’m a passionate developer with a strong interest in both backend and
        frontend technologies. I enjoy tackling challenges across the full
        stack, crafting efficient and user-friendly applications.
      </p>
      <p>
        Over time, I have honed my skills in modern programming languages and
        frameworks, including <strong>JavaScript</strong>, <strong>SQL</strong>,{" "}
        <strong>Java</strong>, <strong>Spring Boot</strong>, <strong>Golang</strong>,
        and <strong>React</strong>.
      </p>
      <p>
        When I’m not coding, I explore my creative side through 3D modeling. I
        work with tools like <strong>Blender</strong> and{" "}
        <strong>Adobe 3D Substance Painter</strong> to bring my digital creations
        to life.
      </p>
    </div>
  );
}

export default About;
