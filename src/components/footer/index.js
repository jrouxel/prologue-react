import React from 'react';
import { connect } from 'react-redux';

const Footer = () => {
  return (
    <div //test
    style={{position: 'center', right: '50%'}}>
      Test
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Footer);