import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import EntranceView from './entrance-view';
import { hostName, clientId } from 'Utilities/vkparams';

const EntranceContainer = ({ vkToken, ...rest }) => {
  if (vkToken) {
    return <Redirect to="/friends" />;
  }

  const authQueryParams = qs.stringify({
    client_id: clientId,
    redirect_uri: `http://${hostName}/progress`,
    display: 'page',
    scope: 'friends',
    response_type: 'code',
  });

  return <EntranceView authQueryParams={authQueryParams} {...rest} />;
};

EntranceContainer.propTypes = {
  vkToken: PropTypes.string,
  onProgressChanged: PropTypes.func,
  inProgress: PropTypes.bool,
};

EntranceContainer.defaultProps = {
  vkToken: null,
  inProgress: false,
};

export default EntranceContainer;
