import React from 'react';
import { connect } from 'react-redux';

const Carousel = () => {
  return (
    <div>Carousel Area</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);