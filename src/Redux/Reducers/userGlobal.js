const INITIAL_STATE = {
    id: null,
    name: '',
    email: '',
    password : ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'KEEP_LOGIN':
            return {...INITIAL_STATE,
                id: action.payload.id,
                name: action.payload.name, 
                email: action.payload.email,
            }
        case 'LOG_OUT' :
            return {...INITIAL_STATE}
            
            default : 
        return state
        }
    }