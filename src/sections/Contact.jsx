// sections/Contact.jsx
import React, { useState, useEffect } from 'react';
import './Sections.css';

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const contactInfo = [
    { label: 'Email', value: 'khang.nguyen@stonybrook.edu', command: 'mailto:khang.nguyen@stonybrook.edu' },
    { label: 'Phone', value: '631-816-3874', command: 'tel:6318163874' },
    { label: 'LinkedIn', value: 'linkedin/khang-nguyen', command: 'https://linkedin.com/in/khang-nguyen' },
    { label: 'GitHub', value: 'github/matchalatte2609', command: 'https://github.com/matchalatte2609' },
  ];

  useEffect(() => {
    setVisible(true);
    
    const typingTimer = setInterval(() => {
      setTypingIndex(prev => {
        if (prev < contactInfo.length - 1) return prev + 1;
        clearInterval(typingTimer);
        return prev;
      });
    }, 800);
    
    return () => {
      clearInterval(typingTimer);
      setVisible(false);
    };
  }, []);

  const handleContactClick = (command) => {
    if (command.startsWith('http')) {
      window.open(command, '_blank');
    } else {
      window.location.href = command;
    }
  };

  return (
    <div className={`section contact-section ${visible ? 'visible' : ''}`}>
      <div className="section-header">
        <h2>$ whoami --contact</h2>
      </div>
      
      <div className="ascii-banner">
        <pre>
          {`
  ┌─┐┌─┐┌┐┌┌┬┐┌─┐┌─┐┌┬┐  ┌┬┐┌─┐
  │  │ ││││ │ ├─┤│   │   │││├┤ 
  └─┘└─┘┘└┘ ┴ ┴ ┴└─┘ ┴   ┴ ┴└─┘
          `}
        </pre>
      </div>
      
      <div className="contact-list">
        {contactInfo.map((contact, index) => (
          <div 
            key={index} 
            className={`contact-item ${index <= typingIndex ? 'visible' : ''}`}
            onClick={() => handleContactClick(contact.command)}
          >
            <span className="contact-label">{contact.label}:</span>
            <span className="contact-value">{contact.value}</span>
            <span className="contact-hint">{/* Click to open */}</span>
          </div>
        ))}
      </div>
      
      <div className="contact-form-hint">
        <span className="comment">// Click on any contact method to reach out</span>
        <p className="terminal-message">Or type <span className="command">send-message</span> to open the contact form</p>
      </div>
      
      <div className="terminal-signature">
        <pre>
          {`
  [EOF]
  Thanks for visiting my terminal portfolio!
          `}
        </pre>
      </div>
    </div>
  );
};

export default Contact;