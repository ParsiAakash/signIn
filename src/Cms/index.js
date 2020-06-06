/* eslint-disable arrow-body-style */
import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import isLoggedIn from '.././helpers/is_logged_in';
import  './styles.css';

const handleLogout = () => () => {
localStorage.removeItem('loggedIn');;
  window.location.href = '/'
  console.log('you have been logged out. boo!');
};

const Cms = () => {
  if (isLoggedIn()) {
    return (
      <div>
        <Helmet>
          <title>CMS</title>
        </Helmet>

        <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
           <div className="log"><button className="logOut" onClick={handleLogout()}>Logout </button> </div>
        </Sidebar>
        <div className="welcome">
        <h1>  WELCOME </h1>
        </div>
      </div>
    );
}
else {
  return <Redirect to="/login" />;

}
};

export default Cms;
