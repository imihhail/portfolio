import './footer.css';
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

function Footer() {

return (
    <div className="footerSection">
        <div className="bottomLine">
        </div>
        <div className="mediaIcons">
         <FaGithub className='icon'/>
         <BsLinkedin className='icon'/>
         <FaFacebookSquare className='icon' />
         <SiGmail className='icon'/>
        </div>
    </div>
    )
}

export default Footer