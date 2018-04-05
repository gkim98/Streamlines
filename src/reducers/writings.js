const writingsReducerDefaultState = [];

const writingsReducer = (state = writingsReducerDefaultState, 
    action) => {
    
    switch(action.type) {
        case 'ADD_WRITING':
            return [...state, action.writing]
        case 'GET_WRITINGS':
            return action.writings
        default: 
            return state
    }
}

export default writingsReducer