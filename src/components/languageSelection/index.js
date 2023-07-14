import React from 'react';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'

const LanguageSelection = () => {
  return (
    <Menu right>
        <div>Select Language:</div>
    </Menu>
  )
};

// Here you could map state values to props if needed
const mapStateToProps = ({ bot }) => ({
  // your state values here
})

// Here you could map dispatch actions to props if needed
const mapDispatchToProps = dispatch => ({
  // your dispatch actions here
})

// Then connect your component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelection);