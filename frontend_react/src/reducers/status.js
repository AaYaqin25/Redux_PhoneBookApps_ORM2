const status = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE':
            return { ...state, ...action.params }
        default:
            return state
    }
}

export default status