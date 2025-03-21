// App.jsx - Main Application Component
import React, { useState, useEffect } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import TerminalCommands from './utils/terminalCommands';
import ThemeSwitcher from './utils/themeSwitcher';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentPath, setCurrentPath] = useState('/');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', content: 'Terminal Portfolio v1.0.0' },
    { type: 'system', content: 'Welcome to Khang H. Nguyen\'s interactive terminal portfolio!' },
    { type: 'system', content: 'Type "help" to see available commands' },
    { type: 'input', content: 'whoami' },
    { type: 'output', content: 'Khang H. Nguyen - Applied Mathematics and Statistics - Computer Science Student' },
  ]);
  const [theme, setTheme] = useState('dark');

  // Initialize theme on component mount
  useEffect(() => {
    const initialTheme = ThemeSwitcher.initTheme();
    setTheme(initialTheme);
  }, []);

  const handleCommand = (input) => {
    // Add the command to history
    setTerminalHistory(prev => [...prev, { type: 'input', content: input }]);
    
    // Process command
    const result = TerminalCommands.processCommand(input, currentPath);
    
    // Handle different types of command results
    switch (result.type) {
      case 'clear':
        setTerminalHistory([
          { type: 'system', content: 'Terminal cleared' },
        ]);
        break;
        
      case 'navigation':
        // Handle navigation between sections
        setCurrentSection(result.target);
        setTerminalHistory(prev => [...prev, { 
          type: 'output', 
          content: `Navigating to ${result.target} section...` 
        }]);
        break;
        
      case 'path':
        // Handle directory changes
        setCurrentPath(result.newPath);
        setTerminalHistory(prev => [...prev, { 
          type: 'output', 
          content: `Directory changed to ${result.newPath}` 
        }]);
        break;
        
      case 'theme':
        // Handle theme changes
        const newTheme = result.theme === 'toggle' 
          ? ThemeSwitcher.toggleTheme() 
          : ThemeSwitcher.applyTheme(result.theme);
        
        setTheme(newTheme);
        setTerminalHistory(prev => [...prev, { 
          type: 'output', 
          content: `Theme switched to ${newTheme} mode` 
        }]);
        break;
        
      case 'social':
        // Handle social media links
        if (result.platform === 'github') {
          window.open('https://github.com/matchalatte2609', '_blank');
          setTerminalHistory(prev => [...prev, { 
            type: 'output', 
            content: 'Opening GitHub profile...' 
          }]);
        } else if (result.platform === 'linkedin') {
          window.open('https://linkedin.com/in/khang-nguyen', '_blank');
          setTerminalHistory(prev => [...prev, { 
            type: 'output', 
            content: 'Opening LinkedIn profile...' 
          }]);
        } else {
          setTerminalHistory(prev => [...prev, { 
            type: 'output', 
            content: 'Available platforms: github, linkedin' 
          }]);
        }
        break;
        
      default:
        // Handle regular output or errors
        setTerminalHistory(prev => [...prev, { 
          type: result.type, 
          content: result.content 
        }]);
        break;
    }
  };

  // Render the appropriate section content
  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className={`app theme-${theme}`}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">khang@portfolio: ~{currentPath}{currentSection !== 'home' ? `/${currentSection}` : ''}</div>
        </div>
        <div className="terminal-content">
          <Terminal history={terminalHistory} onCommand={handleCommand} currentPath={currentPath} />
          <div className="section-content">
            {renderSection()}
          </div>
        </div>
        <div className="terminal-footer">
          <span className="terminal-status">Theme: {theme} | {new Date().toLocaleDateString()}</span>
          <span className="terminal-hint">Type "theme" to toggle dark/light/retro modes</span>
        </div>
      </div>
    </div>
  );
}

export default App;