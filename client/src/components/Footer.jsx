import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 - Created by Group 2</p>
        <a
          href="https://github.com/jjackson0228/Pawsitive-Connection"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub Repository
        </a>
      </div>
    </footer>
  );
};

export default Footer;
