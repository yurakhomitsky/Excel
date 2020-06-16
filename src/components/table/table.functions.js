import { range } from '../../core/untils';
import { CODES, MAX_ROW } from './constants';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export async function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col, index) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;
  const increaseColumn = () => `[data-id="${row}:${checkMaxCol(col)}"]`;

  const increaseRow = () => `[data-id="${checkMaxRow(row)}:${col}"]`;

  const decreaseRow = () => `[data-id="${checkMinValue(row)}:${col}"]`;

  const decreaseColumn = () => `[data-id="${row}:${checkMinValue(col)}"]`;

  function checkMinValue(value) {
    return value - 1 < MIN_VALUE ? MIN_VALUE : value - 1;
  }
  function checkMaxCol(value) {
    return value + 1 > CODES.Z - CODES.A ? CODES.Z - CODES.A : value + 1;
  }
  function checkMaxRow(value) {
    return value + 1 > MAX_ROW - 1 ? MAX_ROW - 1 : value + 1;
  }

  const keyEvents = {
    Enter: increaseRow,
    ArrowDown: increaseRow,
    Tab: increaseColumn,
    ArrowRight: increaseColumn,
    ArrowLeft: decreaseColumn,
    ArrowUp: decreaseRow,
  };
  return keyEvents[key]();
}
