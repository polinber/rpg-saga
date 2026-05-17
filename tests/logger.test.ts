import { describe, it, expect } from 'vitest';
import { Logger } from '../src/services/Logger';

describe('Logger', () => {
    it('should log a message and store it', () => {
        const logger = new Logger();
        logger.log('Test message');
        expect(logger.getLogs()).toEqual(['Test message']);
    });

    it('should store multiple messages in order', () => {
        const logger = new Logger();
        logger.log('First');
        logger.log('Second');
        expect(logger.getLogs()).toEqual(['First', 'Second']);
    });

    it('should not share logs between instances', () => {
        const logger1 = new Logger();
        const logger2 = new Logger();
        logger1.log('Log for logger1');
        expect(logger1.getLogs()).toEqual(['Log for logger1']);
        expect(logger2.getLogs()).toEqual([]);
    });
});