import { combineReducers } from "redux"
import reducers from "./reducers"

const allReducers = combineReducers({
  reduce: reducers,
})

export default allReducers