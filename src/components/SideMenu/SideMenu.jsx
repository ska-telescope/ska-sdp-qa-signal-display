/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './SideMenu.scss';

function SideMenu() {
  const { t } = useTranslation();

  const NAV_OPEN = '150px';
  const NAV_CLOSED = '10px';
  const [navWidth, setNavWidth] = React.useState(NAV_OPEN);
  function changeNav() {
    setNavWidth(navWidth === NAV_OPEN ? NAV_CLOSED : NAV_OPEN);
    document.getElementById('mySidenav').style.width = navWidth;
  }

  return (
    <div id="mySidenav" className="sideNav" onClick={() => changeNav()}>
      <a href="#">{t('label.qaMetrics')}</a>
    </div>
  );
}

export default SideMenu;
