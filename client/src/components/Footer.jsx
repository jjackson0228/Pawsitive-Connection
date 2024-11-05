import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
      <p>
        &copy; {new Date().getFullYear()} - Created by <strong>Group 2</strong>
      </p>
      <p>
        <a
          href="https://github.com/jjackson0228/Pawsitive-Connection"
          target="_blank"
          rel="noopener noreferrer"
        >
          View our GitHub Repository
        </a>
      </p>
    </footer>
  );
};

export default Footer;