import { ADD_USER } from "../actions/types";

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
      default:
        return state
    }
  }