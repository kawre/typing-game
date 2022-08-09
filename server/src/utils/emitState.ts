import { State } from "../service/match.service";

export const emitState = (state: Map<number, State>) =>
  Array.from(state.values());
