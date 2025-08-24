export const setCredentials = (payload)=>({
    type: 'auth/setCredentials',
    payload,     //
})

export const logout = () => ({
    type: 'auth/logout',
})

