import { type } from "@testing-library/user-event/dist/type";

//Define all available terminal commands
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

export const parseCommand = (input) => {
  if (!input || !input.trim()) return { command: '', args: []}

  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { command, args };
};

export const processCommand = (input, currentPath= '/') => {
  const { command, args } = parseCommand(input);

  switch(command) {
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
        target:command === COMMANDS.EXP ? COMMANDS.EXPERIENCE : 
        command === COMMANDS.PROJ ? COMMANDS.PROJECTS : command,
      };
  }
  
}