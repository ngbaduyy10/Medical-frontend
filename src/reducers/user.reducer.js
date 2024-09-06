export const setUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user;
        default:
            return state;
    }
}