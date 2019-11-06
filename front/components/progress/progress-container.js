import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ProgressView from './progress-view';
import { hostName } from 'Utilities/vkparams';

class ProgressContainer extends React.Component {
  constructor(props) {
    super(props);
    this.sendVkCode = this.sendVkCode.bind(this);
    this.analyzeServerResponse = this.analyzeServerResponse.bind(this);
    this.saveVkAuthData = this.saveVkAuthData.bind(this);
    this.state = {
      status: 'working',
      text: '',
    };
  }

  componentDidMount() {
    const location = this.props.location;
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (
      typeof queryParams === 'undefined' ||
      typeof queryParams.code === 'undefined'
    ) {
      this.setState({
        status: 'error',
        text: 'Lost data',
      });
      return;
    } else if (typeof queryParams.error !== 'undefined') {
      this.setState({
        status: 'error',
        text: queryParams.error_description,
      });
      return;
    }

    this.sendVkCode(queryParams.code);
  }

  // Send to api server vk-code
  sendVkCode(vkCode) {
    axios
      .post(`http://${hostName}/api_v1/auth`, {
        code: vkCode,
      })
      .then(response => {
        this.analyzeServerResponse(response.data);
      })
      .catch(err => {
        this.setState({
          status: 'error',
          text: err.message,
        });
      });
  }

  analyzeServerResponse(data) {
    if (typeof data === 'undefined' || data === null) {
      this.setState({
        status: 'error',
        text: 'Lost data',
      });
    } else if (data.status === 'error') {
      this.setState({
        ...data,
      });
    } else if (typeof data.access_token !== 'undefined') {
      this.saveVkAuthData(data.access_token, data.user_id);
    } else {
      this.setState({
        status: 'error',
        text: 'Uncaught lost data',
      });
    }
  }

  // Store access token and user id
  saveVkAuthData(access_token, userId) {
    this.props.onTokenGot(access_token);
    this.props.onUserIdGot(userId);
    this.props.onProgressChanged(false);
    this.setState({
      status: 'success',
    });
  }

  render() {
    return this.state.status === 'success' ? (
      <Redirect to="/friends" />
    ) : (
      <ProgressView progress={this.state} />
    );
  }
}

ProgressContainer.propTypes = {
  onTokenGot: PropTypes.func,
  onUserIdGot: PropTypes.func,
  onProgressChanged: PropTypes.func,
};

export default ProgressContainer;
