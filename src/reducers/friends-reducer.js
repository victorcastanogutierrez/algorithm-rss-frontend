import {  REMOVE_USERS, ADD_FRIENDS } from "../constants";

export default function friends(state = [], action) {
  switch (action.type) {
    case ADD_FRIENDS:
      return { ...state, ...action.payload };
    case REMOVE_USERS:
      return [];
    default:
      return state;
  }
}
