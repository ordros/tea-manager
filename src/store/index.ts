import { combineReducers, createStore } from "redux";
import teaPresetEdit from "~/reducers/teaPresetEdit";
import teaList from "~/reducers/teaList";

const RootReducer = combineReducers({
  teaPresetEdit,
  teaList,
});

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(RootReducer)
export default store;