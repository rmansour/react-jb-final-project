import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import vacations from './vacations.reducer'

export default combineReducers({
    auth,
    message,
    vacations
});
