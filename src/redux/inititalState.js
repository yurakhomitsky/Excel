import { storage } from '../core/untils';
import { defaultTitle } from '../constants';

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataState: {},
    currentStyles: {},
    stylesState: {},
    currentText: '',
    

};

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState;
