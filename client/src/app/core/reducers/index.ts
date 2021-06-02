import { ActionReducerMap } from "@ngrx/store";
import { listReducer, listData } from "./list.reducer";
import { selectionReducer, selectionData } from "./selection.reducer";

interface AppState {
  listState: listData[];
  selectionState: selectionData[];
}

export const reducers: ActionReducerMap<AppState> = {
  listState: listReducer,
  selectionState: selectionReducer
};
