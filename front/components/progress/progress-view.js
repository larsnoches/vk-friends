import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './progress-styles.scss';

const ProgressView = ({ progress }) => (
  <div className={styles.progressCard}>
    {progress.status !== 'working' ? (
      progress.status === 'error' ? (
        <>
          <div className={styles.progressCardTitle}>{progress.text}</div>
          <div className={styles.progressCardBody}>
            <Link to="/" className={styles.button}>
              Try again
            </Link>
          </div>
        </>
      ) : (
        <div className={styles.progressCardTitle}>{progress.text}</div>
      )
    ) : (
      <div className={styles.progressCardTitle}>In progress</div>
    )}
  </div>
);

ProgressView.propTypes = {
  progress: PropTypes.instanceOf(Object),
};

export default ProgressView;
