import "./contact.css";
import { BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";

function Contact() {
  const contacts = [
    {
      icon: <BsLinkedin />,
      link: "https://linkedin.com/in/ivar-mihhailov",
      label: "LinkedIn",
      text: "linkedin.com/in/ivar-mihhailov",
    },
    {
      icon: <SiGmail />,
      link: "mailto:ivar.mihhailov@gmail.com",
      label: "Email",
      text: "ivar.mihhailov@gmail.com",
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      text: "+(372) 56294889",
    },
  ];

  return (
    <div className="contactSection">
      <h1>Contact Me</h1>
      <p>Feel free to reach out to me through any of the following platforms:</p>
      <div className="contactIcons">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contactLink"
            aria-label={contact.label}
          >
            <span className="icon">{contact.icon}</span>
            <span className="contactLabel">
              <u>{contact.text}</u>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
