import { SET_USER } from "./action";

const initState = {user_id: ""};

export const userReducer = (store = initState, {type, payload}) => {
    switch(type) {
        case SET_USER:
            return {...store, user_id: payload};
        default:
            return store;
    }
};