import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved.</div>
      <div>
        <Link to={"https://www.facebook.com/znyandeep.baishya"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://github.com/ZyanHere"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/jyan-baishya-a6a502217/"} target="_blank">
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;