import React from 'react';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'

const LanguageSelection = ({ isSideMenuOpen }) => {
  return (
    <div>
      <Menu right isOpen={isSideMenuOpen} noOverlay>
        {<div>hello</div>}
      </Menu>
    </div>
  )
};

const mapStateToProps = (state) => ({
  isSideMenuOpen: state.bot.languagePanelOpen
})

export default connect(mapStateToProps)(LanguageSelection);