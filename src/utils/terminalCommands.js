// utils/terminalCommands.js

// Define all available terminal commands
export const COMMANDS = {
  HELP: 'help',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  EXP: 'exp',
  PROJECTS: 'projects',
  PROJ: 'proj',
  SKILLS: 'skills',
  CONTACT: 'contact',
  CLEAR: 'clear',
  EXIT: 'exit',
  THEME: 'theme',
  LS: 'ls',
  CAT: 'cat',
  CD: 'cd',
  PWD: 'pwd',
  WHOAMI: 'whoami',
  DATE: 'date',
  ECHO: 'echo',
  MAN: 'man',
  SOCIAL: 'social',
};

// Advanced command parser
export const parseCommand = (input) => {
  if (!input || !input.trim()) return { command: '', args: [] };
  
  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

// Command processor
export const processCommand = (input, currentPath = '/') => {
  const { command, args } = parseCommand(input);
  
  // Basic commands
  switch (command) {
    case COMMANDS.HELP:
      return {
        type: 'output',
        content: generateHelpText(),
      };
      
    case COMMANDS.CLEAR:
      return {
        type: 'clear',
      };
      
    case COMMANDS.ABOUT:
    case COMMANDS.EXPERIENCE:
    case COMMANDS.EXP:
    case COMMANDS.PROJECTS:
    case COMMANDS.PROJ:
    case COMMANDS.SKILLS:
    case COMMANDS.CONTACT:
      return {
        type: 'navigation',
        target: command === COMMANDS.EXP ? COMMANDS.EXPERIENCE : 
               command === COMMANDS.PROJ ? COMMANDS.PROJECTS : command,
      };
    
    case COMMANDS.LS:
      return {
        type: 'output',
        content: generateLsOutput(currentPath, args),
      };
      
    case COMMANDS.CAT:
      if (args.length === 0) {
        return {
          type: 'error',
          content: 'Usage: cat <filename>',
        };
      }
      return {
        type: 'output',
        content: generateCatOutput(args[0], currentPath),
      };
      
    case COMMANDS.CD:
      return {
        type: 'path',
        newPath: calculateNewPath(currentPath, args[0] || ''),
      };
      
    case COMMANDS.PWD:
      return {
        type: 'output',
        content: currentPath,
      };
      
    case COMMANDS.WHOAMI:
      return {
        type: 'output',
        content: 'Khang H. Nguyen - Applied Mathematics and Statistics - Computer Science Student',
      };
      
    case COMMANDS.DATE:
      return {
        type: 'output',
        content: new Date().toString(),
      };
      
    case COMMANDS.ECHO:
      return {
        type: 'output',
        content: args.join(' '),
      };
      
    case COMMANDS.THEME:
      return {
        type: 'theme',
        theme: args[0] || 'toggle',
      };
      
    case COMMANDS.MAN:
      if (args.length === 0) {
        return {
          type: 'error',
          content: 'What manual page do you want?',
        };
      }
      return {
        type: 'output',
        content: generateManPage(args[0]),
      };
      
    case COMMANDS.SOCIAL:
      return {
        type: 'social',
        platform: args[0] || 'list',
      };
      
    case '':
      return {
        type: 'output',
        content: '',
      };
      
    default:
      // Easter eggs
      if (command === 'sudo') {
        return {
          type: 'error',
          content: 'Nice try! But this terminal doesn\'t have sudo privileges.',
        };
      }
      
      if (command === 'exit') {
        return {
          type: 'output',
          content: 'You can close this tab or visit another site to exit.',
        };
      }
      
      if (['hello', 'hi', 'hey'].includes(command)) {
        return {
          type: 'output',
          content: 'Hello there! Type "help" to see what I can do.',
        };
      }
      
      return {
        type: 'error',
        content: `Command not found: ${command}. Type "help" for available commands.`,
      };
  }
};

// Helper functions
const generateHelpText = () => {
  return `
Available commands:
  about              Display information about me
  experience (exp)   Show my work experience
  projects (proj)    View my projects
  skills             List my technical skills
  contact            How to reach me
  
  ls                 List directory contents
  cat <file>         Display file content
  cd <directory>     Change directory
  pwd                Print working directory
  whoami             Display user info
  date               Show current date and time
  echo <message>     Print message
  man <command>      Display manual for command
  theme [dark|light] Change theme
  social <platform>  Open social media profiles
  
  clear              Clear the terminal
  help               Show this help message
`;
};

const generateLsOutput = (path, args) => {
  // Simulate a filesystem structure
  const filesystem = {
    '/': ['about/', 'experience/', 'projects/', 'skills/', 'contact/', 'README.md'],
    '/about': ['education.txt', 'bio.txt'],
    '/experience': ['research.txt', 'internship.txt', 'goldman.txt'],
    '/projects': ['quack.txt', 'caticu.txt'],
    '/skills': ['languages.txt', 'frameworks.txt', 'tools.txt', 'libraries.txt'],
    '/contact': ['email.txt', 'social.txt'],
  };
  
  // Normalize path
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;
  
  // Get directory contents
  const dirContents = filesystem[normalizedPath.slice(0, -1)] || [];
  
  // Format the output
  return dirContents.join('  ');
};

const generateCatOutput = (filename, path) => {
  // Simulate file contents
  const fileContents = {
    'README.md': 'Welcome to Khang H. Nguyen\'s terminal portfolio!\n\nType "help" to see available commands.',
    'education.txt': 'SUNY Stony Brook University | GPA: 3.93/4.00\nBachelor of Science in Applied Mathematics and Statistics - Computer Science\nStony Brook, NY\nExpected graduation: May 2028',
    'bio.txt': 'I\'m a tech enthusiast with a passion for software engineering, research, and problem-solving.',
    'research.txt': 'Undergraduate Research Assistant\nBlockchain Business Lab - College of Business, Stony Brook University\nJan. 2025 – Present',
    'internship.txt': 'Software Engineer Intern\nTierra JSC\nFeb. 2024 – Aug. 2024',
    'goldman.txt': 'Goldman Sachs Possibilities Summit Candidate\nGoldman Sachs\nDec. 2024 – Present',
    'quack.txt': 'Project Quack | MERN Stack\nA data-driven restaurant recommendation platform.',
    'caticu.txt': 'Cat in the ICU | Cat\'s shelter - Co-founder\n21 cats rescued from the street, abusive owners, and slaughter house.',
    'email.txt': 'khang.nguyen@stonybrook.edu',
    'social.txt': 'GitHub: github/matchalatte2609\nLinkedIn: linkedin/khang-nguyen',
    // Add more files as needed
  };
  
  // Check if file exists
  if (fileContents[filename]) {
    return fileContents[filename];
  }
  
  return `cat: ${filename}: No such file or directory`;
};

const calculateNewPath = (currentPath, targetPath) => {
  // Handle absolute paths
  if (targetPath.startsWith('/')) {
    return targetPath;
  }
  
  // Handle parent directory
  if (targetPath === '..') {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length === 0) return '/';
    parts.pop();
    return '/' + parts.join('/');
  }
  
  // Handle current directory
  if (targetPath === '.' || targetPath === '') {
    return currentPath;
  }
  
  // Handle relative paths
  const normalizedCurrent = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
  return `${normalizedCurrent}${targetPath}`.replace(/\/+/g, '/');
};

const generateManPage = (command) => {
  const manPages = {
    'help': 'HELP(1)\n\nNAME\n    help - display available commands\n\nSYNOPSIS\n    help\n\nDESCRIPTION\n    Display a list of available commands and their descriptions.',
    
    'about': 'ABOUT(1)\n\nNAME\n    about - display information about Khang\n\nSYNOPSIS\n    about\n\nDESCRIPTION\n    Show personal information, ASCII art name, and a brief introduction.',
    
    'experience': 'EXPERIENCE(1)\n\nNAME\n    experience - display work experience\n\nSYNOPSIS\n    experience\n    exp\n\nDESCRIPTION\n    Show professional experience information with details about each position.',
    
    'projects': 'PROJECTS(1)\n\nNAME\n    projects - display project information\n\nSYNOPSIS\n    projects\n    proj\n\nDESCRIPTION\n    Show details about personal and professional projects.',
    
    'skills': 'SKILLS(1)\n\nNAME\n    skills - display technical skills\n\nSYNOPSIS\n    skills\n\nDESCRIPTION\n    Show a visual representation of technical skills categorized by type.',
    
    'contact': 'CONTACT(1)\n\nNAME\n    contact - display contact information\n\nSYNOPSIS\n    contact\n\nDESCRIPTION\n    Show contact details and social media links.',
    
    'ls': 'LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls\n\nDESCRIPTION\n    List information about files and directories in the current directory.',
    
    'cat': 'CAT(1)\n\nNAME\n    cat - concatenate and display file content\n\nSYNOPSIS\n    cat <filename>\n\nDESCRIPTION\n    Print the content of a file to the terminal output.',
    
    'cd': 'CD(1)\n\nNAME\n    cd - change directory\n\nSYNOPSIS\n    cd [directory]\n\nDESCRIPTION\n    Change the current working directory to the specified directory.\n    If no directory is specified, changes to the root directory.',
    
    'theme': 'THEME(1)\n\nNAME\n    theme - change terminal theme\n\nSYNOPSIS\n    theme [dark|light]\n\nDESCRIPTION\n    Change the visual theme of the terminal.\n    If no argument is provided, toggles between dark and light mode.',
  };
  
  return manPages[command] || `No manual entry for ${command}`;
};

export default {
  COMMANDS,
  parseCommand,
  processCommand,
};