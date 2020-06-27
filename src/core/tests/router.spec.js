const { Router } = require('../routes/Router');
import { Page } from '../Page';
import { ActiveRoute } from '../routes/ActiveRoute';

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML = `dashboard`;
        return root;
    }
}
class ExcelPage extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML = `excel`;
        return root;
    }
}
describe('Router', () => {
    let router;
    let $root;
    beforeEach(() => {
    $root = document.createElement('div');
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage,
        });
    });
    test('should be defined', () => {
        expect(router).toBeDefined();
    });

    test('should render Dashboard Page', () => {
        router.changePageHandler();
        expect($root.innerHTML).toBe('<div>dashboard</div>');
        
    });

    test('should call ActiveRoute path', () => {
        const fn = jest.spyOn(ActiveRoute, 'path', 'get').mockReturnValue('excel')
        router.changePageHandler();
        expect(fn).toHaveBeenCalled();
    });

    test('should render Excel Page', () => {
        const fn = jest.spyOn(ActiveRoute, 'path', 'get').mockReturnValue('excel')
        router.changePageHandler();
        expect(fn).toHaveBeenCalled();
        expect(fn()).toBe('excel');
        expect($root.innerHTML).toBe('<div>excel</div>');
        
    });

});
