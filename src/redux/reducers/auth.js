import * as actions from '../actions';

const initialState = {
    Language: 'eng',
    CurrentUser: {
        ID: null,
        Email: null,
        PhoneNumber: null,
        DateOfBirth: null,
    }
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actions.REGISTER_NEW_USER:
            return {
                ...state,
                CurrentUser: {
                    ...state.CurrentUser,
                    ID: action.payload.ID,
                    Email: action.payload.Email,
                    PhoneNumber: action.payload.PhoneNumber,
                    DateOfBirth: action.payload.DateOfBirth,
                }
            }
        case actions.LOGOUT_CURRENT_USER:
            return {
                ...state,
                CurrentUser: initialState.CurrentUser
            }
        case actions.CHANGE_CURRENT_LANGUAGE:
            return {
                ...state,
                Language: action.payload
            }
        default:
            return state;

    }
};

export default auth;
