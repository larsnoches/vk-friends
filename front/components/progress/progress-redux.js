import { connect } from 'react-redux';
import {
  updateToken,
  updateUserId,
  changeEnterProgress,
} from '../../state/actions';
import ProgressContainer from './progress-container';

const mapDispatchToProps = dispatch => ({
  onTokenGot: token => dispatch(updateToken(token)),
  onUserIdGot: userId => dispatch(updateUserId(userId)),
  onProgressChanged: inProgress => dispatch(changeEnterProgress(inProgress)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProgressContainer);
