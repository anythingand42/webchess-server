export const SET_CHALLENGES_SEARCH_OPPONENT = "SET_CHALLENGES_SEARCH_OPPONENT";
export const SET_CAN_CLICK_SEARCH_OPPONENT = "SET_CAN_CLICK_SEARCH_OPPONENT";

export const setChallengesSearchOpponent = (challenges) => ({
    type: SET_CHALLENGES_SEARCH_OPPONENT,
    payload: challenges
});

export const setCanClickSearchOpponent = (canClick) => ({
    type: SET_CAN_CLICK_SEARCH_OPPONENT,
    payload: canClick
});