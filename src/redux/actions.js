import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE } from './types';

function createAction(type) {
    return function(data) {
        return {
            type,
            data,
        }
    }
    
}

export const tableResize = createAction(TABLE_RESIZE);
export const changeText = createAction(CHANGE_TEXT);
export const changeStyles = createAction(CHANGE_STYLES);
export const applyStyle = createAction(APPLY_STYLE);
export const changeTitle = createAction(CHANGE_TITLE)