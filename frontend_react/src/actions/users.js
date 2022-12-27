import axios from 'axios'
import { setStatus } from './status';
const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
});

export const loadUserSuccess = (data, pageOne) => ({
    type: 'LOAD_USER_SUCCESS',
    data,
    pageOne
})

export const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => (dispatch, getState) => request.get('users', { params: getState().status })
    .then(({ data }) => {
        dispatch(setStatus({ page: data.data.page, totalPage: data.data.totalPage }))
        dispatch(loadUserSuccess(data.data.result, data.data.page === 1 ? true : false))
    }).catch((err) => {
        dispatch(loadUserFailure())
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
        console.log(data.data, 'ini update');
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


