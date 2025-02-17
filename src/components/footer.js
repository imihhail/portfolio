import './footer.css';
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

function Footer() {

const icons = [
    { component: FaGithub, link: "https://github.com/imihhail" },
    { component: BsLinkedin, link: "https://linkedin.com/in/ivar-mihhailov" },
    { component: FaFacebookSquare, link: "https://www.facebook.com/profile.php?id=100001865901824" },
    { component: SiGmail, link: "mailto:ivar.mihhailov@gmail.com" }
];

return (
    <div>
        <div className="bottomLine"> </div>
        <div className="footerSection">

            <div className="mediaIcons">
                <div className='iconArray1'>
                    {icons.map((icon, index) => {
                        const IconComponent = icon.component;
                            return (
                                <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                                    <IconComponent className='icon' />
                                </a>
                            );
                        })}
                </div>
                <div className='iconArray2'>
                    {icons.map((icon, index) => {
                        const IconComponent = icon.component;
                            return (
                                <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                                    <IconComponent className='icon' />
                                </a>
                            );
                        })}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer