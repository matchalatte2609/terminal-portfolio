// sections/Projects.jsx
import React, { useState, useEffect } from 'react';
import './Sections.css';

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  
  const projects = [
    {
      id: 'quack',
      name: 'Project Quack',
      period: 'Aug 2024 - Present',
      tech: ['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js'],
      description: 'A data-driven restaurant recommendation platform.',
      achievements: [
        'Reduced API response time by 35% through implementation of MongoDB indexing and Express.js.',
        'Increased user engagement by 45% by developing React components for price comparison and restaurant filtering.',
        'Improved search functionality speed by implementing efficient MongoDB aggregation pipelines for menu data queries.',
        'Working with a team of 5 peers.'
      ]
    },
    {
      id: 'caticu',
      name: 'Cat in the ICU',
      period: 'April 2022 - Aug 2024',
      tech: ['Cat Shelter', 'Non-Profit'],
      description: 'Co-founded and managed a cat shelter organization.',
      achievements: [
        '21 cats have been rescued from the street, abusive owners, and slaughter house.',
        'Every cat gets taken care by private vet, fully vaccinated, and neutered before finding a new home.',
        'Funded by private tutoring at a rate of 600K VND (approx. 24$)(AP & IB subjects, mostly Economics).'
      ]
    }
  ];

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  const toggleProject = (id) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <div className={`section projects-section ${visible ? 'visible' : ''}`}>
      <div className="section-header">
        <h2>$ ls -la ~/projects</h2>
      </div>
      
      <div className="project-list">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-item ${expandedProject === project.id ? 'expanded' : ''}`}
            onClick={() => toggleProject(project.id)}
          >
            <div className="project-header">
              <span className="folder-icon">{expandedProject === project.id ? '📂' : '📁'}</span>
              <span className="project-name">{project.name}</span>
              <span className="project-period">{project.period}</span>
            </div>
            
            {expandedProject === project.id && (
              <div className="project-details">
                <div className="project-tech">
                  <span className="label">Technologies:</span>
                  <div className="tech-tags">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="project-description">
                  <span className="comment">// Description</span>
                  <p>{project.description}</p>
                </div>
                
                <div className="project-achievements">
                  <span className="comment">// Achievements</span>
                  <ul>
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>
                        <span className="bullet-point">$</span> {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="terminal-tip">
        <span className="comment">// Click on a project to view details</span>
      </div>
    </div>
  );
};

export default Projects;