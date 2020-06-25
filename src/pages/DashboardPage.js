import { Page } from '../core/Page';
import { $ } from '@core/dom';
import { createRecordsTable } from '../components/dashboard/dashboard.functions';

export class DashoardPage extends Page {
    getRoot() {
      const now = Date.now().toString();
        return $.create('div', 'dashboard').html(
            `
            <div class="dashboard__header">
              <h1>Excel Dashboard</h1>
            </div>
            <div class="dashboard__new">
              <div class="dashboard__view">
                <a href="#excel/${now}" class="dashboard__create">
                  New <br/> Table
                </a>
              </div>
            </div>
            <div class="dashboard__table dashboard__view">
              ${createRecordsTable()}
            </div>`
        );
    }
}
