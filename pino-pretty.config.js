
const chalk = require('chalk')
const ctx = new chalk.Instance({ level: 3 })

let prevTime = 0;

module.exports = {
  levelFirst: true,
  colorize: true,
  errorLikeObjectKeys: ['err', 'error'],
  translateTime: 'yyyy-mm-dd\'T\'HH:MM:ss.l\'Z\'',
  messageFormat: ({
    msg,
    time
  }) => {
    let msDiff = 0;
    if (!prevTime) {
      prevTime = time;
    }
    msDiff = time - prevTime;
    prevTime = time;
    const ms = ` (${msDiff}ms)`;
    return ctx.grey(msg) + ' ' + ctx.magenta(ms);
  },
  customLevels: {
    10: {
      name: 'silly',
      label: 'SILLY',
      color: 'cyan'
    },
    15: {
      name: 'verbose',
      label: 'VERBOSE',
      color: 'gray'
    },
    20: {
      name: 'debug',
      label: 'DEBUG',
      color: 'blue'
    },
    30: {
      name: 'info',
      label: 'INFO',
      color: 'green'
    },
    35: {
      name: 'log',
      label: 'LOG',
      color: 'green'
    },
    40: {
      name: 'warn',
      label: 'WARN',
      color: 'yellow'
    },
    50: {
      name: 'error',
      label: 'ERROR',
      color: 'red'
    },
    60: {
      name: 'crit',
      label: 'CRIT',
      color: 'white',
      background: 'bgRed'
    }
  }
};
