export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false;
        }
        this.listeners[eventName].forEach(listener => {
            listener(...args);
        })
        return true;
    }

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        return () => {
            this.listeners[event] = this.listeners[event]
            .filter(listener => listener !== callback);
        }
    }
}

// const emitter = new Emitter();
// emitter.subscribe('yura', data => console.log('Sub: ', data));

// emitter.emit('yura', 18);
