import './scss/index.scss';
import { Router } from './core/routes/Router';
import { DashoardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';

new Router('#app', {
    dashboard: DashoardPage,
    excel: ExcelPage,

})


