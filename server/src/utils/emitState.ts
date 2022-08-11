import { Match, matches } from "../service/match.service";

export const emitState = (match: Match) => {
  const state = Array.from(match.state.values()).map((s) => {
    if (s.place) return s;
    const { correctInputs, allCorrectInputs, allInputs } = s;

    return {
      ...s,
      wpm: correctInputs / 5 / (match.time / 60),
      acc: (allCorrectInputs / allInputs) * 100,
      progress: (correctInputs / match.quote.length) * 100,
    };
  });

  return state;
};
