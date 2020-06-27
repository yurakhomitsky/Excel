import { Page } from '../core/Page';
import { Excel } from '../components/excel/Excel';
import { Header } from '../components/header/Header';
import { ToolBar } from '../components/toolbar/Toolbar';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';
import { normalizeInitialState } from '../redux/inititalState';
import { StateProcessor } from '../core/StateProcessor/StateProcessor';
import { LocalStorageClient } from '../core/StateProcessor/LocalStorageClient';

export class ExcelPage extends Page {
    constructor(param) {
        super(param);
        this.storeSub = null;
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        );
    }
    async getRoot() {
        const state = await this.processor.get();

        const inititalState = normalizeInitialState(state);
        const store = createStore(rootReducer, inititalState);

        this.storeSub = store.subscribe(this.processor.listen);

        this.excel = new Excel({
            components: [Header, ToolBar, Formula, Table],
            store,
        });
        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
        this.storeSub.unsubscribe();
    }
}
