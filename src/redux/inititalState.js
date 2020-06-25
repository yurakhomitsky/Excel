import { defaultTitle, defaultStyles } from '../constants';
import { clone } from '../core/untils';

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataState: {},
    currentStyles: {},
    stylesState: {},
    currentText: '',
    openedDate: new Date().toJSON(),
    

};
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}