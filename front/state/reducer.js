const initialState = {
  items: [],
  inProgress: false,
  vkToken: null,
  userId: null,
  userName: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        vkToken: action.token,
      };
    case 'UPDATE_USERID':
      console.log(action.userId);
      return {
        ...state,
        userId: action.userId,
      };
    case 'UPDATE_USERNAME':
      return {
        ...state,
        userName: action.userName,
      };
    case 'UPDATE_FRIENDS':
      return {
        ...state,
        items: action.items,
      };
    case 'CHANGE_ENTER_PROGRESS':
      return {
        ...state,
        inProgress: action.inProgress,
      };
    default:
      return state;
  }
};

export default reducer;
