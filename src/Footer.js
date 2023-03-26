import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">Developed By Fort Wayne Nano Dev</p>
      <p className="footer-text">&copy; {currentYear} All rights reserved.</p>
      <p className="footer-text">
        This application was created in collaboration with GPT-4, an advanced
        language model by OpenAI.
      </p>
    </footer>
  );
};

export default Footer;
