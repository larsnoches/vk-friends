import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './layout-styles.scss';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Vk friends app</title>
    </Helmet>
    <main className={styles.container}>{children}</main>
  </>
);

export default Layout;
