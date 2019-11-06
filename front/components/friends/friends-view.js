import React from 'react';
import PropTypes from 'prop-types';
import styles from './friends-styles.scss';

const FriendsView = ({ status, items, text, userName }) => {
  if (status === 'error') {
    return (
      <div className={styles.friendsErrorCard}>
        <div className={styles.friendsErrorCardTitle}>{text}</div>
      </div>
    );
  }
  return (
    <div className={styles.friendsList}>
      <div className={styles.friendsListTitle}>
        {userName ? `Logged as ${userName}` : ''}
      </div>
      {items.map((item, index) => (
        <div
          key={`friend-${index.toString()}`}
          className={styles.friendsListCard}
        >
          <div className={styles.friendsListCardImage}>
            <img src={item.photo_50} alt="" />
          </div>
          <div className={styles.friendsListCardName}>
            {`${item.first_name} ${item.last_name}`}
          </div>
        </div>
      ))}
    </div>
  );
};

FriendsView.propTypes = {
  status: PropTypes.string,
  items: PropTypes.arrayOf(Object),
  text: PropTypes.string,
  userName: PropTypes.string,
};

FriendsView.defaultProps = {
  status: '',
  items: [],
  text: '',
};

export default FriendsView;
