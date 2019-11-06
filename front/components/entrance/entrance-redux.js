import { connect } from 'react-redux';
import { changeEnterProgress } from '../../state/actions';
import EntranceContainer from './entrance-container';

const mapStateToProps = state => ({
  vkToken: state.vkToken,
  inProgress: state.inProgress,
});

const mapDispatchToProps = dispatch => ({
  onProgressChanged: inProgress => dispatch(changeEnterProgress(inProgress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntranceContainer);
