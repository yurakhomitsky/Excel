import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options?.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];
        this.prepare();
    }

    prepare() {}

    // Notify all listeners about event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // Subscribing on event
    $on(event, fn) {
        const unsubscribe = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsubscribe);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Render pattern component
    toHTML() {
        throw new Error('Subclass did not implement toHTML');
    }

    init() {
        this.initDOMListeners();
    }
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsub) => unsub());
    }
}
