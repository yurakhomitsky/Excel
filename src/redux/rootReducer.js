export function rootReducer(state, action) {
    const actions = {
        __INIT__: () => {
            return {...state};
        },
        TABLE_RESIZE: () => {
            const field = action.data.type === 'col' ? 'colState': 'rowState'
            const prevState = state[field] || {};
            prevState[action.data.id] = action.data.value
            return {
                ...state,
                [field]: prevState,
            };
        },
        CHANGE_TEXT: () => {
            const prevState = state['dataState'] || {};
            prevState[action.data.id] = action.data.textContent;
            return {
                ...state,
                currentText: action.data.textContent,
                dataState: prevState,
            }
        },
        CHANGE_STYLES: () => {
            return {...state, currentStyles: action.data}
        },
        APPLY_STYLE: () => {
            const prevState = state['stylesState'] || {};
            action.data.ids.forEach(id => {
            prevState[id] = {
                ...prevState[id],
                ...action.data.value,
            }
            })
            return {
                ...state,
                stylesState: prevState,
                currentStyles: {...state.currentStyles, ...action.data.value},

            }
        },
        CHANGE_TITLE: () => {
            return {
                ...state,
                title: action.data,
            }
        },
        UPDATE_DATE: () => {
            return {
                ...state,
                openedDate: action.data,
            }
        },
        default: () => {
            return {...state};
        },
    };
    return (actions[action.type] || actions['default'])()

}
