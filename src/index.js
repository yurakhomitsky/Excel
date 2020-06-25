import { Excel } from './components/excel/Excel';
import { Header } from './components/header/Header';
import { ToolBar } from './components/toolbar/Toolbar';
import { Formula } from './components/formula/Formula';
import { Table } from './components/table/Table';
import './scss/index.scss';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { storage, debounce } from './core/untils';
import { initialState } from './redux/inititalState';

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
    console.log('App state: ',state);
    storage('excel-state', state);
}, 300);
store.subscribe(stateListener);

const excel = new Excel('#app', {
    components: [Header, ToolBar, Formula, Table],
    store,
});

excel.render();
