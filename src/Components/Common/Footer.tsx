import React from "react";
import linkedinLogo from "../Images/linkedin-footer-logo.png";
import githubLogo from "../Images/github-footer-logo.png";

function Footer() {
  return (
    <footer>
      <a
        href="https://www.linkedin.com/in/alan-vargas-5b6b814b/"
        target="blank"
      >
        <img src={linkedinLogo} alt="linkedin logo" className="footer-logo" />
      </a>
      <a href="https://github.com/AlannV/ratherlabs-challenge" target="blank">
        <img src={githubLogo} alt="github logo" className="footer-logo" />
      </a>
    </footer>
  );
}

export default Footer;
