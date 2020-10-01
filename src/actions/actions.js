import { 
    ADD_USER,
    ADD_CESTA
} from "./types"

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: user,
  }
}
export const addCesta = prod => {
    return {
      type: ADD_CESTA,
      payload: prod,
    }
  }