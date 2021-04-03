import {createContext, useReducer} from "react";
import InitialState from "./initialState";

// reducer function to manage and modify the state.
const reducer = (state, action) => {
    console.log(`reducer at: ${action.type}`)

    switch (action.type) {
        case 'UPDATE_QUEUE':
            return {
                queue: action.payload
            };
        case 'SET_ERROR':
            return {
                error: action.payload
            };
        default:
            return state;
    }
};

// useGlobalState
export default () => {
    const [globalState, globalDispatch] = useReducer(reducer, InitialState);

    return {globalState, globalDispatch}
};

// Context = store = global state
export const Context = createContext(InitialState)
