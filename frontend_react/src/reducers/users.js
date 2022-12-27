const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return [...(action.pageOne ? [] : state), ...action.data.map(item => {
                item.sent = true
                return item
            })]
        case 'LOAD_USER_FAILURE':
            break
        case 'ADD_USER':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ]

        case 'ADD_USER_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.data.id,
                        name: action.data.name,
                        phone: action.data.phone,
                        sent: true
                    }
                }
                return item
            })

        case 'ADD_USER_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        sent: false
                    }
                }
                return item
            })

        case 'RESEND_USER_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.data.id,
                        name: action.data.name,
                        phone: action.data.phone,
                        sent: true
                    }
                }
                return item
            })
        case 'RESEND_USER_FAILURE':
            break;
        case 'REMOVE_USER_SUCCESS':
            return state.filter(item => item.id !== action.id)

        case 'REMOVE_USER_FAILURE':
            break;
        case 'UPDATE_USER_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.data.id,
                        name: action.data.name,
                        phone: action.data.phone,
                        sent: true
                    }
                }
                return item
            })

        case 'UPDATE_USER_FAILURE':
            break;
        default:
            return state
    }
}

export default users