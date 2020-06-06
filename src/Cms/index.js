/* eslint-disable arrow-body-style */
import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import isLoggedIn from '.././helpers/is_logged_in';
import styles from './styles.css';

const handleLogout = () => () => {
localStorage.removeItem('loggedIn');;
  window.location.href = '/'
  console.log('you have been logged out. boo!');
};

const Cms = () => {
  if (!isLoggedIn()) {
  return <Redirect to="/login" />;
}
else {
  return (
    <div>
      <Helmet>
        <title>CMS</title>
      </Helmet>

      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Menu.Item name="logout" onClick={handleLogout()}>
          <Icon name="power" />
          Logout
        </Menu.Item>
      </Sidebar>
      <div className={styles.mainBody}>
        WELCOME
      </div>
    </div>
  );
}
};

export default Cms;
