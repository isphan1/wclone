import {combineReducers} from 'redux'
import messages from "../message/message"
import friends from "../friends/friends"

export default combineReducers({
    messages,
    friends
})