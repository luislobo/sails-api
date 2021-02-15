/**
 * Sets up pino for the use of 'debug'
 */
const colors = require('colors/safe');

const pinoDebug = require('pino-debug');

const nsColors = {};
const nsTime = {};
let nsIndex = 0;
const nsColorsSelection = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'brightRed',
  'brightGreen',
  'brightYellow',
  'brightBlue',
  'brightMagenta',
  'brightCyan',
  'brightWhite'
];

function colorNs(ns) {
  if (!nsColors[ns]) {
    nsColors[ns] = nsColorsSelection[nsIndex++];
    nsIndex = nsIndex % nsColorsSelection.length;
  }
  return colors[nsColors[ns]];
}

const logger = require('pino')({
  prettyPrint: {
    colorize: true,
    errorLikeObjectKeys: ['err', 'error'],
    levelFirst: true,
    translateTime: 'yyyy-mm-dd\'T\'HH:MM:ss.l\'Z\'',
    messageFormat: ({ns, msg, time}) => {
      // get per namespace ms
      let msDiff = 0;
      if (nsTime[ns]) {
        msDiff = time - nsTime[ns];
        nsTime[ns] = time;
      } else {
        nsTime[ns] = 0;
      }
      const ms = ` ${msDiff}ms`;
      const currentColorNs = colorNs(ns);
      return currentColorNs(ns) + ' ' + colors.reset(msg) + ' ' + currentColorNs(ms);
    },
    ignore: 'ns'
  },
  level: process.env.LEVEL || 'trace'
}, process.stderr);

pinoDebug(logger);

/**
 * Starts the app
 */
require('./app');
