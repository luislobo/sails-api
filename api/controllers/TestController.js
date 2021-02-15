const debug = require('debug')('controller-test');
const _ = require('lodash');
module.exports = {
  test(req, res) {
    const data = {
      sample: 'data',
      is: new Date(),
      shown: 'here',
      pi: 3.14159265
    };
    sails.log([],'log');
    sails.log.verbose('verbose');
    sails.log.info('info');
    sails.log.debug('debug');
    _.delay(() => sails.log.debug('delayed debug'), 1000);
    sails.log.warn('warn');
    sails.log.error('error');
    sails.log.silly('silly');
    sails.log.crit('crit');

    try {
      debug('test 1');
      _.delay(_.noop, 1000);
      debug('test 2');
      throw new Error({
        error: 'this',
        code: 404
      });
    } catch (err) {
      sails.log.error(err.message, data);
      res.serverError({
        aaa: err,
        data
      });
    }
  }
};
