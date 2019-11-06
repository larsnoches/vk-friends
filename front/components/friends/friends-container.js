import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import FriendsView from './friends-view';
import { hostName } from 'Utilities/vkparams';

class FriendsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.loadProfileName = this.loadProfileName.bind(this);
    this.loadFriendsList = this.loadFriendsList.bind(this);
    this.state = {
      status: 'working',
      text: '',
    };
  }

  componentDidMount() {
    const token = this.props.vkToken;
    const userId = this.props.userId;
    if (!token) return;

    this.loadProfileName(token, userId);
    this.loadFriendsList(token);
  }

  // Load profile name from api server
  loadProfileName(token, userId) {
    axios
      .post(`http://${hostName}/api_v1/profile`, {
        token,
        userId,
      })
      .then(response => {
        if (response.data.status === 'error') {
          this.setState({
            ...response.data,
          });
          return;
        }
        // store items
        this.props.onUserNameGot(response.data.userName);
      })
      .catch(err => {
        this.setState({
          status: 'error',
          text: err.message,
        });
      });
  }

  // Load friends from api server
  loadFriendsList(token) {
    axios
      .post(`http://${hostName}/api_v1/friends`, {
        token,
      })
      .then(response => {
        if (response.data.status === 'error') {
          this.setState({
            ...response.data,
          });
          return;
        }
        // store items
        this.props.onFriendsGot(response.data);
      })
      .catch(err => {
        this.setState({
          status: 'error',
          text: err.message,
        });
      });
  }

  render() {
    if (!this.props.vkToken) {
      return <Redirect to="/" />;
    }
    return (
      <FriendsView
        userName={this.props.userName}
        items={this.props.items}
        {...this.state}
      />
    );
  }
}

FriendsContainer.propTypes = {
  vkToken: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string,
  onUserNameGot: PropTypes.func,
  onFriendsGot: PropTypes.func,
  items: PropTypes.arrayOf(Object),
};

FriendsContainer.defaultProps = {
  vkToken: null,
  userId: null,
  items: [],
};

export default FriendsContainer;
