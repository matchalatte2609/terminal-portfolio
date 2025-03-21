// sections/About.jsx
import React, { useEffect, useState } from 'react';
import './Sections.css';

const About = () => {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = `
  ██╗  ██╗██╗  ██╗ █████╗ ███╗   ██╗ ██████╗     ███╗   ██╗ ██████╗ ██╗   ██╗██╗   ██╗███████╗███╗   ██╗
  ██║ ██╔╝██║  ██║██╔══██╗████╗  ██║██╔════╝     ████╗  ██║██╔════╝ ██║   ██║╚██╗ ██╔╝██╔════╝████╗  ██║
  █████╔╝ ███████║███████║██╔██╗ ██║██║  ███╗    ██╔██╗ ██║██║  ███╗██║   ██║ ╚████╔╝ █████╗  ██╔██╗ ██║
  ██╔═██╗ ██╔══██║██╔══██║██║╚██╗██║██║   ██║    ██║╚██╗██║██║   ██║██║   ██║  ╚██╔╝  ██╔══╝  ██║╚██╗██║
  ██║  ██╗██║  ██║██║  ██║██║ ╚████║╚██████╔╝    ██║ ╚████║╚██████╔╝╚██████╔╝   ██║   ███████╗██║ ╚████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝
                                                                                                    
  // ABOUT ME
  --------------------

  Name: Khang H. Nguyen
  Location: Stony Brook, NY
  Status: Applied Mathematics and Statistics - Computer Science Student @ Stony Brook University
  GPA: 3.93/4.00
  
  I'm a tech enthusiast with a passion for software engineering, research, and problem-solving.
  Currently, I'm working as a research assistant at the Blockchain Business Lab while pursuing my 
  undergraduate degree.

  /** KEY HIGHLIGHTS **/
  - Experience in full-stack development 
  - Research in quantitative finance and ML integration
  - Led multiple projects and teams
  - Passionate about helping others, as demonstrated through my cat shelter initiative
  `;

  // Simulating terminal typing effect
  useEffect(() => {
    setVisible(true);
    
    let i = 0;
    const typeSpeed = 5; // Character typing speed in ms
    
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, typeSpeed);
      }
    };
    
    typeWriter();
    
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div className={`section about-section ${visible ? 'visible' : ''}`}>
      <pre className="ascii-art">{typedText}</pre>
    </div>
  );
};

export default About;