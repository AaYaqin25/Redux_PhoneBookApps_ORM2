const users = (state = {
    data: [],
    params: {
        page: 1,
        totalPage: 0
    }
}, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                data: action.data.map(item => {
                    item.sent = true
                    return item
                }),
                params: {
                    page: action.page,
                    totalPage: action.totalPage
                }
            }
        case 'LOAD_USER_FAILURE':
            break
        case 'LOAD_MORE_SUCCESS':
            return {
                data: [...state.data, ...action.data.value.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.data.params
            }
        case 'LOAD_MORE_FAILURE':
            break
        case 'SEARCH_USER_SUCCESS':
            return {
                data: action.data.value.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.data.params
            }
        case 'SEARCH_USER_FAILURE':
            break
        case 'ADD_USER':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone,
                        sent: true
                    }
                ]
            }

        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'ADD_USER_FAILURE':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })]
            }

        case 'RESEND_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }
        case 'RESEND_USER_FAILURE':
            break;
        case 'REMOVE_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.filter(item => item.id !== action.id)]
            }

        case 'REMOVE_USER_FAILURE':
            break;
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'UPDATE_USER_FAILURE':
            break;
        default:
            return state
    }
}

export default users