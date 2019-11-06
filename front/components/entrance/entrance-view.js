import React from 'react';
import PropTypes from 'prop-types';
import styles from './entrance-styles.scss';

const EntranceView = ({ authQueryParams, inProgress, onProgressChanged }) => (
  <div className={styles.entranceCard}>
    <div className={styles.entranceCardTitle}>
      Welcome to Vk friends application
    </div>
    <div className={styles.entranceCardBody}>
      <a
        href={`https://oauth.vk.com/authorize?${authQueryParams}`}
        onClick={() => {
          onProgressChanged(true);
        }}
        className={styles.button}
      >
        {inProgress ? 'Entering...' : 'Enter'}
      </a>
    </div>
  </div>
);

EntranceView.propTypes = {
  authQueryParams: PropTypes.string,
  onProgressChanged: PropTypes.func,
  inProgress: PropTypes.bool,
};

export default EntranceView;
