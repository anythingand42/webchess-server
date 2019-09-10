export const SEARCH_BUTTON_SET_AVAILABILITY = "SEARCH_BUTTON_SET_AVAILABILITY";
export const SEARCH_BUTTON_SET_PRESSED = "SEARCH_BUTTON_SET_PRESSED";
export const LOBBY_SET_CHALLENGES = "LOBBY_SET_CHALLENGES";

export const searchButtonSetAvailability = (buttonName, isAvailable) => ({
    type: SEARCH_BUTTON_SET_AVAILABILITY,
    payload: {
        buttonName: buttonName,
        isAvailable: isAvailable
    }
});

export const searchButtonSetPressed = (buttonName, isPressed) => ({
    type: SEARCH_BUTTON_SET_PRESSED,
    payload: {
        buttonName: buttonName,
        isPressed: isPressed
    }
});

export const lobbySetChallenges = (challenges) => ({
    type: LOBBY_SET_CHALLENGES,
    payload: challenges
});