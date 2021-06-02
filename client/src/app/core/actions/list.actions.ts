import { Action } from '@ngrx/store';

export enum ActionTypes {
  SELECTION_UPDATE = '[Selection] update',
  LIST_UPDATE = '[List] update',
}

export class listUpdate implements Action {
  readonly type = ActionTypes.LIST_UPDATE;
  constructor(public payload: { list: any[] }) {}
}

export class selectionUpdate implements Action {
  readonly type = ActionTypes.SELECTION_UPDATE;
  constructor(public payload: { selection: any[] }) {}
}

