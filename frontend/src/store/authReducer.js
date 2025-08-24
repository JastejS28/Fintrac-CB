const initialState= {
    user: JSON.parse(localStorage.getItem('user' )) || null,
    token:localStorage.getItem('token') || null,
    isLoggedIn: false
}

function authReducer(state= initialState, action){
    switch(action.type){
        case 'auth/setCredentials':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token:action.payload.token,
                isLoggedIn: true
            }
            case 'auth/logout':
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false
            }
            default: return state;
    }
}

export default authReducer;