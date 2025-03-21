// sections/Experience.jsx
import React, { useState, useEffect } from 'react';
import './Sections.css';

const Experience = () => {
  const [visible, setVisible] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(0);
  const experiences = [
    {
      title: 'Undergraduate Research Assistant',
      company: 'Blockchain Business Lab - College of Business, Stony Brook University',
      location: 'Stony Brook, NY',
      period: 'Jan 2025 - Present',
      bullets: [
        'Accelerated portfolio optimization by 35% via automated WRDS in Python, cutting manual data input.',
        'Enhanced investment return predictions by integrating ML algorithms into quantitative finance models.',
        'Raised cross-functional collaboration efficiency by documenting research findings.'
      ]
    },
    {
      title: 'Goldman Sachs Possibilities Summit Candidate',
      company: 'Goldman Sachs',
      location: 'New York City, NY',
      period: 'Dec 2024 - Present',
      bullets: [
        "Developed comprehensive financial markets knowledge through participation in Goldman Sachs' selective freshman development program, engaging with 50+ industry professionals across investment banking, sales & trading, and asset management divisions"
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'Tierra JSC',
      location: 'Ho Chi Minh City, Vietnam',
      period: 'Feb 2024 - Aug 2024',
      bullets: [
        'Built a full-stack application achieving 35% faster data processing with React (frontend), Python (backend).',
        'Automated integration of 10+ master datasets, reducing retrieval time by 27% and manual entry by 90%.',
        'Developed robust ETL processes improving data accuracy by 95% by standardizing financial data extraction from multiple CSV and JSON sources into a unified interface'
      ]
    }
  ];

  useEffect(() => {
    setVisible(true);
    
    // Auto-cycle through experiences
    const timer = setInterval(() => {
      setCurrentExperience((prev) => (prev + 1) % experiences.length);
    }, 8000); // Change every 8 seconds
    
    return () => {
      clearInterval(timer);
      setVisible(false);
    };
  }, []);

  const handleNext = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const exp = experiences[currentExperience];

  return (
    <div className={`section experience-section ${visible ? 'visible' : ''}`}>
      <div className="section-header">
        <h2>$ cat experience.log</h2>
        <div className="pagination">
          <button onClick={handlePrev}>&lt; prev</button>
          <span>{currentExperience + 1}/{experiences.length}</span>
          <button onClick={handleNext}>next &gt;</button>
        </div>
      </div>
      
      <div className="experience-card">
        <div className="experience-title">
          <span className="prompt">&gt;</span> {exp.title}
        </div>
        <div className="experience-company">
          {exp.company} | {exp.location}
        </div>
        <div className="experience-period">
          {exp.period}
        </div>
        <ul className="experience-bullets">
          {exp.bullets.map((bullet, index) => (
            <li key={index} className="typing-effect">
              <span className="bullet-point">$</span> {bullet}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="terminal-tip">
        <span className="comment">// Type 'exp next' or 'exp prev' to navigate</span>
      </div>
    </div>
  );
};

export default Experience;