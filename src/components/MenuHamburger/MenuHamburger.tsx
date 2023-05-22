import * as React from 'react'
import './MenuHamburger.scss';

const MenuHamburger = () => {
  return (
    <div className="editDeleteMenuWrapper">
      <section className="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
      </section>
    </div>
  );
};

export default MenuHamburger;
