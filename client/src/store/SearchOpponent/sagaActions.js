export const SEARCH_OPPONENT_MOUNT = "SEARCH_OPPONENT_MOUNT";
export const SEARCH_OPPONENT_UNMOUNT = "SEARCH_OPPONENT_UNMOUNT";
export const SEARCH_BUTTON_CLICK = "SEARCH_BUTTON_CLICK";
export const CHALLENGE_CLICK = "CHALLENGE_CLICK";

export const handleMount = () => {
    return {
        type: SEARCH_OPPONENT_MOUNT
    };
};

export const handleSearchButtonClick = (time) => {
    return {
        type: SEARCH_BUTTON_CLICK,
        payload: time
    };
};

export const handleChallengeClick = (time) => {
    return {
        type: CHALLENGE_CLICK,
        payload: time
    };
};


export const handleUnmount = () => {
    return {
        type: SEARCH_OPPONENT_UNMOUNT
    };
};