import { 
    ADD_USER,
    ADD_CESTA
} from "../actions/types";

const initialState = {
    users: [],
    products: [],
    cesta: []
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                user: [action.payload, ...state.users]
            }
        case ADD_CESTA:
            return {
                prod: [action.payload, ...state.cesta]
            }
        default:
            return state
    }
  }