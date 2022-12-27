import { combineReducers } from 'redux'
import users from './users'
import status from './status'

export default combineReducers({
  users,
  status
})