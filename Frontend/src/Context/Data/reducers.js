import { initialUserData } from "./initialState";

export const reducerUser = (state,action)=>{
    switch (action.method) {
        case 'INITIAL_USER':
            const data = action.data
            return {...state, user: data}
    
        default:
            return initialUserData;
    }
}   