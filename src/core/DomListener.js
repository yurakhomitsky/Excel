import { capitalize } from './untils';

/**
 *
 *
 * @export
 * @class DomListener
 * @classdesc - Class for management events
 */
export class DomListener {

    constructor($root, listeners = []) {
        
        if (!$root) {
            throw new Error(`No $root provided for DomListener`);
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    /**
     * Add DOM listeners for component
     *
     * @memberof DomListener
     */
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);

            if (!this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in ${this.name} Component`
                )
            }

            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method])
        });
    }

    /**
     * Removes DOM listeners from component
     *
     * @memberof DomListener
     */
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        })
    }

}
    // input => onInput
    /**
     * Return event name with prefix on and capitalized event Name
     * 
     * @param {string} eventName - Event name
     * @return {string} - Event name
     */
    function getMethodName(eventName) {
        return 'on' + capitalize(eventName);
    }
