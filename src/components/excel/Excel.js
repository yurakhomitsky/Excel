import { $ } from '../../core/dom';
import { Emitter } from '../../core/Emitter';
import { StoreSubscriber } from '../../core/StoreSubscriber';
import { updateDate } from '../../redux/actions';

/**
 * @class Excel
 */
export class Excel {
    /**
     *Creates an instance of Excel.
     * @param {object} options  The object with array of components, store, subscribe, emiiter
     */
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    /**
     * Gerenate root div with needed components.
     * Gerenate root div for components.
     * Creates an instance of Components.
     *
     * @return {HTMLElement} The root div with class excel
     */
    getRoot() {
        // returns instance of Dom class
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter,
            store: this.store,
        };

        // loop through list of components
        this.components = this.components.map((Component) => {
            // return instance of Dom class for each component
            const $el = $.create('div', Component.className);

            // creates instance for each component
            const component = new Component($el, componentOptions);

            // fill innerHTML element from each components
            $el.html(component.toHTML());

            // append element to root div
            $root.append($el);

            return component;
        });
        return $root;
    }

    /**
     * Render the whole app
     */
    init() {
        this.store.dispatch(updateDate(new Date().toJSON()))
        
        this.subscriber.subscribeComponents(this.components);
        // loop through list of components and call init() for init eventListeners
        this.components.forEach((component) => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach((component) => component.destroy());
    }
}
