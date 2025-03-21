// sections/Skills.jsx
import React, { useState, useEffect } from 'react';
import './Sections.css';

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const skills = {
    languages: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 95 },
      { name: 'C/C++', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'R', level: 75 },
      { name: 'TypeScript', level: 80 },
    ],
    frameworks: [
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'Figma', level: 70 },
      { name: 'MongoDB', level: 85 },
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'AWS Cloud', level: 75 },
      { name: 'VS Code', level: 95 },
      { name: 'Visual Studio', level: 85 },
      { name: 'PyCharm', level: 80 },
      { name: 'IntelliJ', level: 85 },
      { name: 'Eclipse', level: 70 },
      { name: 'RStudio', level: 75 },
      { name: 'Linux', level: 80 },
    ],
    libraries: [
      { name: 'pandas', level: 90 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'TensorFlow', level: 75 },
      { name: 'WRDS', level: 85 },
    ],
  };

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return Object.entries(skills).flatMap(([category, items]) =>
        items.map(item => ({ ...item, category }))
      );
    }
    return skills[activeCategory].map(item => ({ ...item, category: activeCategory }));
  };

  const renderSkillBar = (skill, index) => {
    const delayMultiplier = 0.1;
    
    return (
      <div key={index} className="skill-item" style={{ animationDelay: `${index * delayMultiplier}s` }}>
        <div className="skill-info">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-level">{skill.level}%</span>
        </div>
        <div className="skill-bar">
          <div 
            className="skill-progress" 
            style={{ 
              width: `${skill.level}%`,
              backgroundColor: getColorForCategory(skill.category)
            }}
          ></div>
        </div>
      </div>
    );
  };

  const getColorForCategory = (category) => {
    switch(category) {
      case 'languages': return '#00aaff';
      case 'frameworks': return '#00ff7f';
      case 'tools': return '#ff7f50';
      case 'libraries': return '#9370db';
      default: return '#00ff00';
    }
  };

  return (
    <div className={`section skills-section ${visible ? 'visible' : ''}`}>
      <div className="section-header">
        <h2>$ man skills</h2>
      </div>
      
      <div className="skills-filter">
        <button 
          className={activeCategory === 'all' ? 'active' : ''} 
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {Object.keys(skills).map(category => (
          <button 
            key={category}
            className={activeCategory === category ? 'active' : ''} 
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="skills-container">
        {getFilteredSkills().map(renderSkillBar)}
      </div>
      
      <div className="terminal-tip">
        <span className="comment">// Skills are rated based on relative proficiency</span>
      </div>
    </div>
  );
};

export default Skills;