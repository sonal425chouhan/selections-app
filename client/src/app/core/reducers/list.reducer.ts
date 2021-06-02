import { createReducer, on, createSelector } from '@ngrx/store';
import { ActionTypes} from '../actions/list.actions';

export interface listData {
  firstName: string;
  lastName: string;
  email: string;
}
export const initialState: listData[] = [];

export function listReducer(state = initialState, action: any) {
   console.log('prev state: ', state);
  switch (action.type) {
    case ActionTypes.LIST_UPDATE:
    return {
        ...state, // no other properties, can be removed
        list: action.payload.list
      };
  }
  return state;
}


export const selectListState = (state: any) => state.listState;
export const selectList = createSelector(selectListState, (state) => state );
