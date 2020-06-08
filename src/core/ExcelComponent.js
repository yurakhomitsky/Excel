import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options?.listeners);
        this.name = options.name || ''
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
     }
}
