
const initialState = {
    Language: 'ara',
    CurrentUser: {
        ID: null,
        Email: null,
        PhoneNumber: null,
        DateOfBirth: null,
    }
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case "signIn":
            return {
                ...state,
                CurrentUser:{
                    ...state.CurrentUser,
                    Email: action.payload.Email,
                }
            }
        default:
            return state;

    }
};

export default auth;
