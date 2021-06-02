import { createReducer, on,createSelector  } from '@ngrx/store';
import { ActionTypes } from '../actions/list.actions';

export interface selectionData {
  firstName: string;
  lastName: string;
  email: string;
}
export const initialState: selectionData[] = [];

export function selectionReducer(state = initialState, action: any) {
   console.log('prev state: ', state);
  switch (action.type) {
    case ActionTypes.SELECTION_UPDATE:
   return {
      ...state, // no other properties, can be removed
      selection: action.payload.selection
    };
  }
  return state;
}

export const selectSelectionState = (state:any) => state.selectionState;
export const selectSelection = createSelector(selectSelectionState, (state: any) => state);
