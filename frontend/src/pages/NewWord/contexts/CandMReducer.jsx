export const CandMReducer = (CandMs, action) => {
  switch (action.type) {
    case "CandM/add":
      return [...CandMs, action.CandM];
    case "CandM/delete":
      return CandMs.filter((CandM) => {
        return CandM.id !== action.CandM.id;
      });
    case "CandM/update":
      return CandMs.map((CandM) => {
        return CandM.id === action.CandM.id
          ? { ...CandM, ...action.CandM }
          : { ...CandM };
      });
    case "CandMs/update":
      return action.CandMs;
    case "meaning/update":
      return CandMs.map((CandM) => {
        if (CandM.id === action.CandM.id) {
          const newMeanings = CandM.meanings.map((meaning) => {
            return meaning.id === action.meaning.id
              ? { ...meaning, ...action.meaning }
              : { ...meaning };
          });
          const newCandM = {
            ...CandM,
            meanings: newMeanings,
          };
          // console.log(newCandM);
          return { ...CandM, ...newCandM };
        } else {
          return { ...CandM };
        }
      });
    case "meaning/delete":
      return CandMs.map((CandM) => {
        if (CandM.id === action.CandM.id) {
          const newMeanings = CandM.meanings.filter((meaning) => {
            return meaning.id !== action.meaning.id;
          });
          const newCandM = {
            ...CandM,
            meanings: newMeanings,
          };
          return { ...CandM, ...newCandM };
        } else {
          return { ...CandM };
        }
      });
    default:
      return CandMs;
  }
};
