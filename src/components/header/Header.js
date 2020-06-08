import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    toHTML() {
        return `
        <input class="input" type="text" name="" value="Новая таблица" id="">
        <div>
          <div class="button">
            <span class="material-icons">
              exit_to_app
            </span>
          </div>
          <div class="button">
            <span class="material-icons">
              delete
            </span>
          </div>
        </div>
        `;
    }
}