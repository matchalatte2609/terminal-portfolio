// components/Terminal.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ history, onCommand, currentPath }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to the bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add command to history and reset index
      setCommandHistory(prev => [input, ...prev.slice(0, 9)]);
      setHistoryIndex(-1);
      
      // Execute command
      onCommand(input);
      setInput('');
    }
  };

  // Handle keyboard navigation through command history
  const handleKeyDown = (e) => {
    // Up arrow - navigate backward in history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    // Down arrow - navigate forward in history
    else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple command completion
      const commands = [
        'help', 'about', 'experience', 'projects', 'skills', 'contact',
        'clear', 'ls', 'cat', 'cd', 'pwd', 'whoami', 'date', 'echo', 'theme'
      ];
      
      if (input.trim()) {
        const matchingCommands = commands.filter(cmd => cmd.startsWith(input.trim()));
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Display possible completions
          onCommand('');
          onCommand(`Possible completions: ${matchingCommands.join(' ')}`);
        }
      }
    }
    // Down arrow - navigate forward in history
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Format the prompt based on current path
  const getPrompt = () => {
    const pathDisplay = currentPath === '/' ? '~' : `~${currentPath}`;
    return `khang@portfolio:${pathDisplay}$ `;
  };

  // Render each history item with appropriate styling
  const renderHistoryItem = (item, index) => {
    switch (item.type) {
      case 'system':
        return (
          <div key={index} className="terminal-line system-message">
            {item.content}
          </div>
        );
      case 'input':
        return (
          <div key={index} className="terminal-line input-line">
            <span className="prompt">{getPrompt()}</span>
            {item.content}
          </div>
        );
      case 'output':
        return (
          <div key={index} className="terminal-line output-message">
            {item.content}
          </div>
        );
      case 'error':
        return (
          <div key={index} className="terminal-line error-message">
            {item.content}
          </div>
        );
      default:
        return (
          <div key={index} className="terminal-line">
            {item.content}
          </div>
        );
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-history">
        {history.map(renderHistoryItem)}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-container">
        <span className="prompt">{getPrompt()}</span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;