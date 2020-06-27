const { Emitter } = require('../Emitter');

describe('Emiiter', () => {
    let emitter;
    let handler = jest.fn();
    beforeEach(() => {
        emitter = new Emitter();
    });
    test('should be defined', () => {
        expect(emitter).toBeDefined();
    });
    test('should have method emit', () => {
        expect(emitter.emit).toBeDefined();
    });
    test('should have method subscribe', () => {
        expect(emitter.subscribe).toBeDefined();
    });
    test('should define listener', () => {
        const key = 'yura';
        emitter.subscribe(key, handler);
        expect(emitter.listeners).toHaveProperty(key);
        expect(emitter.listeners).toMatchObject({
            [key]: [handler],
        });
        expect(emitter.listeners[key]).toEqual(
            expect.arrayContaining([handler])
        );
    });
    test('should call listener', () => {
        const key = 'yura';
        emitter.subscribe(key, handler);
        emitter.emit(key, 18);
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith(18);
    });
});
