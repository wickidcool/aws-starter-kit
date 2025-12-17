import jest from 'jest-mock';

/**
 * Manual mock for @aws-lambda-powertools/logger
 */
export class Logger {
  info = jest.fn();
  error = jest.fn();
  warn = jest.fn();
  debug = jest.fn();
  addContext = jest.fn();
}

