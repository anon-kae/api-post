import * as colors from 'colors/safe';
import * as winston from 'winston';

export default winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple()
);

export const json = winston.format.combine(
  winston.format.timestamp(),
  winston.format.uncolorize(),
  winston.format.json()
);

export const plain = winston.format.combine(
  winston.format.errors({stack: true}),
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(msg => {
    const requestId = msg.requestId || '<--- no request --->';
    const userId = msg.userId !== -1 ? msg.userId : '---';
    // handle error object
    if (msg.stack) {
      return `${msg.timestamp} > 🆔 ${colors.gray(
        requestId
      )} | 👤 ${colors.yellow(userId)} [${colors.blue(msg.action)}] ${
        msg.level
      }: ${msg.stack}`;
    }

    // handle error from logger
    if (msg.error && msg.error.stack) {
      return `${msg.timestamp} > 🆔 ${colors.gray(
        requestId
      )} | 👤 ${colors.yellow(userId)} [${colors.blue(msg.action)}] ${
        msg.level
      }: ${msg.error.stack}`;
    }

    return `${msg.timestamp} > 🆔 ${colors.gray(
      requestId
    )} | 👤 ${colors.yellow(userId)} [${colors.blue(msg.action)}] ${
      msg.level
    }: ${msg.message}`;
  })
);
