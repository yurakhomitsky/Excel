import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitle } from '../../redux/actions';
import { $ } from '../../core/dom';
import { defaultTitle } from '../../constants';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        });
    }
    toHTML() {
        const title = this.store.getState().title || defaultTitle;
        return `
        <input class="input" type="text" name="" value="${title}" id="">
        <div>
          <div class="button" data-button="exit">
            <span class="material-icons" data-button="exit">
              exit_to_app
            </span>
          </div>
          <div class="button" data-button="remove">
            <span class="material-icons" data-button="remove">
              delete
            </span>
          </div>
        </div>
        `;
    }
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    }
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.button === 'remove') {
          const decision = confirm('Are sure want to delete this table?');
          if (decision) {
            localStorage.removeItem('excel:' + ActiveRoute.param);
            ActiveRoute.navigate('dashboard');
          }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('dashboard');
        }
    }
}
