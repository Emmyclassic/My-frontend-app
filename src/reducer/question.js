export const askQuestionReducer = (state = [], action) => {
  const { payload, type } = action;
  const updateQuestion = () => {
    const answeredQuestionIdx = state.findIndex(
      (item) => item.id === payload.id
    );
    const copyState = [...state];
    copyState[answeredQuestionIdx] = payload;
    return copyState;
  };

  const addToList = () => {
    const answeredQuestionIdx = state.find((item) => item.id === payload[0].id);

    if (!answeredQuestionIdx) {
      return [...state, ...payload];
    } else {
      return state;
    }
  };

  const updateVoteCount = () => {
    const copyState = [...state];

    const answeredQuestionIdx = state.findIndex(
      (item) => item.id === payload.id
    );

    if (payload.status === "vote removed") {
      copyState[answeredQuestionIdx].vote_count =
        (copyState[answeredQuestionIdx]?.vote_count ?? 0) - 1;
    } else {
      copyState[answeredQuestionIdx].vote_count =
        (copyState[answeredQuestionIdx]?.vote_count ?? 0) + 1;
    }

    return copyState;
  };

  switch (type) {
    case "ASK_QUESTION":
      return addToList();
    case "LISTEN_ANSWERED_QUESTION":
      return updateQuestion();

    case "UPDATE_VOTE_COUNT":
      return updateVoteCount();
    default:
      return state;
  }
};
