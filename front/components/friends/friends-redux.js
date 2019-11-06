import { connect } from 'react-redux';
import { updateFriends, updateUserName } from '../../state/actions';
import FriendsContainer from './friends-container';

const mapStateToProps = state => ({
  items: state.items,
  vkToken: state.vkToken,
  userId: state.userId,
  userName: state.userName,
});

const mapDispatchToProps = dispatch => ({
  onUserNameGot: userName => dispatch(updateUserName(userName)),
  onFriendsGot: items => dispatch(updateFriends(items)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsContainer);
