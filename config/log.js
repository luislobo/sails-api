/**
 * Built-in Log Configuration
 * Based on the work from https://github.com/tswaters/sails-hook-pino
 */

const pino = require('pino');

const config = {
  levelFirst: true,
  customLevels: {
    silly: 10,
    verbose: 15,
    debug: 20,
    info: 30,
    log: 35,
    warn: 40,
    error: 50,
    crit: 60
  },
  level: 'silly', // must be set to silly so that all the logging functions exist
  useOnlyCustomLevels: true
};

function customLogger() {
  return pino(config);
}

const logger = customLogger();

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
  finalLogger.crit(err, 'uncaughtException');
  process.exit(1);
}));

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
  finalLogger.crit(err, 'unhandledRejection');
  process.exit(1);
}));

// console.log({ instance, log: instance.log, debug: instance.debug, debugtext: instance.debug.toString() });
module.exports.log = {
  custom: logger,
  inspect: false,
  prefix: false,
  /***************************************************************************
   *                                                                          *
   * Valid `level` configs: i.e. the minimum log level to capture with        *
   * sails.log.*()                                                            *
   *                                                                          *
   * The order of precedence for log levels from lowest to highest is:        *
   * silly, verbose, info, debug, warn, error                                 *
   *                                                                          *
   * You may also set the level to "silent" to suppress all logs.             *
   *                                                                          *
   ***************************************************************************/

  level: 'silly',
  noShip: true
};
