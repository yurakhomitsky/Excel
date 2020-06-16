import { $ } from '../../core/dom';
import {Emitter} from '../../core/Emitter';

/**
 * @class Excel 
*/
export class Excel {

    /**
     *Creates an instance of Excel.
     * @param {string} selector The desired selector of the html element
     * @param {object} options  The object that contains array of components
     * @memberof Excel
     */
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emitter = new Emitter();
    }

    
    /**
     * Gerenate root div with needed components.
     * Gerenate root div for components.
     * Creates an instance of Components.
     *
     * @return {string} The root div with class excel
     * @memberof Excel
     */
    getRoot() {

        // returns instance of Dom class
        const $root = $.create('div','excel'); 
        
        const componentOptions = {
            emitter: this.emitter,
        }

        // loop through list of components
        this.components = this.components.map(Component => {

            // return instance of Dom class for each component
            const $el = $.create('div', Component.className); 

            // creates instance for each component
            const component = new Component($el,componentOptions);

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
    render() {
        // append <div class="excel"></div> to root <div class id="app"></div>
        this.$el.append(this.getRoot());

        // loop through list of components and call init() for init
        // eventListeners
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}