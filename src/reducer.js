export const initialState = {
  user: localStorage.getItem("user") || null,
  isCreateChatOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", action.user);
      return {
        ...state,
        user: action.user,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
