import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import Deadlinr from './Deadlinr';
import { getUser } from './api/user';


const initialState = {
    user: null,
    calendars: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log('set_user dispatched');
            return {
                ...state,
                user: action.user,
            };
        case 'SET_CALENDARS':
            return {
                ...state,
                calendars: action.calendars,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default function App() {
    return (
        <Provider store={store}>
            <Deadlinr />
        </Provider>
      );
}
