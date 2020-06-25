import { CODES, DEFAULT_WIDTH, DEFAULT_HEIGHT } from './constants';
import { toInlineStyles } from '../../core/untils';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

function toCell(state, row) {
    return function (_, col) {
        const id = `${row}:${col}`;
        const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
        return `
          <div class="cell"
           data-col="${col}" 
           data-type="cell" 
           data-id="${id}"
           data-value="${(getText(state.dataState, id))}" 
           style="${styles};width:${getWidth(state.colState, col)}"
           contenteditable>${parse(getText(state.dataState, id))}</div>
        `;
    };
}

function toColumn({ col, index, width }) {
    return `
      <div class="column" data-type="resizable"
       data-col="${index}" 
       style="width:${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
}

function createRow(index, content, state) {
    const height = getHeight(state, index);
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : '';
    return `
      <div class="row" style="height:${height}" data-type="resizable" data-row="${index}">
        <div class="row-info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}


function getText(state, id) {
    return state[id] || '';
}


function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
    return function (col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index),
        };
    };
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1; // Compute cols count
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols, {}));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('');

        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}
