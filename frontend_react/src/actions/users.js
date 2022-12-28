import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
});

export const loadUserSuccess = (data, pageOne, page, totalPage) => ({
    type: 'LOAD_USER_SUCCESS',
    data,
    pageOne,
    page,
    totalPage
})

export const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => (dispatch, getState) => request.get('users', { params: getState().users.params })
    .then(({ data }) => {
        dispatch(loadUserSuccess(data.data.result, data.data.page === 1 ? true : false, data.data.page, data.data.totalPage))
    }).catch((err) => {
        dispatch(loadUserFailure())
    })


export const loadMoreSuccsess = () => ({
    type: 'LOAD_MORE_SUCCESS'
})

export const loadMoreFailure = () => ({
    type: 'LOAD_MORE_FAILURE'
})


export const loadMore = () => (dispatch, getState) => request.get('users')
    .then(({ data }) => {
        let state = getState()
        if (state.users.params.page <= state.users.params.totalPage) {
            dispatch(loadMoreSuccsess()).then(dispatch(loadUser()))
        }
    }).catch((err) => {
        dispatch(loadMoreFailure(err))
    })



export const addUserSuccess = (id, data) => ({
    type: 'ADD_USER_SUCCESS',
    id,
    data
})


export const addUserFailure = (id) => ({
    type: 'ADD_USER_FAILURE',
    id
})


export const addUserRedux = (id, name, phone) => ({
    type: 'ADD_USER',
    id,
    name,
    phone
})

export const addUser = (name, phone) => dispatch => {
    const id = Date.now()
    dispatch(addUserRedux(id, name, phone))
    return request.post('users', { name, phone })
        .then(({ data }) => {
            dispatch(addUserSuccess(id, data.data))
        }).catch((err) => {
            dispatch(addUserFailure(id))
        })
}


export const removeUserSuccess = (id) => ({
    type: 'REMOVE_USER_SUCCESS',
    id
})


export const removeUserFailure = () => ({
    type: 'REMOVE_USER_FAILURE'
})


export const removeUser = (id) => dispatch => request.delete(`users/${id}`)
    .then(({ data }) => {
        dispatch(removeUserSuccess(id))
    }).catch((err) => {
        dispatch(removeUserFailure(err))
    })


export const updateUserSuccess = (id, data) => ({
    type: 'UPDATE_USER_SUCCESS',
    id,
    data
})


export const updateUserFailure = () => ({
    type: 'UPDATE_USER_FAILURE'
})


export const updateUser = (id, name, phone) => dispatch => request.put(`users/${id}`, { name, phone })
    .then(({ data }) => {
        dispatch(updateUserSuccess(id, data.data))
    }).catch((err) => {
        dispatch(updateUserFailure(err))
    })


export const resendUserSuccess = (id, data) => ({
    type: 'RESEND_USER_SUCCESS',
    id,
    data
})


export const resendUserFailure = () => ({
    type: 'RESEND_USER_FAILURE'
})

export const resendUser = (id, name, phone) => dispatch => request.post('users', { name, phone })
    .then(({ data }) => {
        dispatch(resendUserSuccess(id, data.data))
    }).catch((err) => {
        dispatch(resendUserFailure(err))
    })

export const searchUserSuccess = (data) => ({
    type: 'SEARCH_USER_SUCCESS',
    data

})

export const searchUserFailure = () => ({
    type: 'SEARCH_USER_FAILURE'
})

export const searchUser = (query) => (dispatch) => request.get('users')
    .then(({ data }) => {
        dispatch(searchUserSuccess(query)).then(dispatch(loadUser()))
    }).catch((err) => {
        dispatch(searchUserFailure(err))
    })

