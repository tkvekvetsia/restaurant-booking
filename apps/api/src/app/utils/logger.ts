import { createLogger, format, transports } from 'winston';
import { environment } from '../config/environment';
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create logger instance
export const logger = createLogger({
  format: combine(
    colorize(), // Colorize output for readability
    timestamp(), // Add timestamps to logs
    logFormat // Apply custom log format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' }), // Log all levels to combined file
  ],
});

// Set logger level based on environment
if (environment.environment === 'production') {
  logger.level = 'warn'; // Only log warnings and errors in production
} else {
  logger.level = 'debug'; // Verbose logging for development
}
