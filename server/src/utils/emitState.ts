import { Match } from "../service/match.service";

export const emitState = (match: Match) => {
  return Array.from(match.state.values()).map((s) => {
    if (s.place || match.time <= 0) return s;

    const { correctInputs, allCorrectInputs, allInputs } = s;
    const wpm = correctInputs / 5 / (match.time / 60);
    const acc = (allCorrectInputs / allInputs) * 100;
    const progress = (correctInputs / match.quote.length) * 100;

    return { ...s, wpm, acc, progress };
  });
};
