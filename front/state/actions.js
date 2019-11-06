export const updateToken = token => ({
  type: 'UPDATE_TOKEN',
  token,
});

export const updateUserId = userId => ({
  type: 'UPDATE_USERID',
  userId,
});

export const updateUserName = userName => ({
  type: 'UPDATE_USERNAME',
  userName,
});

export const updateFriends = items => ({
  type: 'UPDATE_FRIENDS',
  items,
});

export const changeEnterProgress = inProgress => ({
  type: 'CHANGE_ENTER_PROGRESS',
  inProgress,
});
