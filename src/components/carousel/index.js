import React from 'react'
import { connect } from 'react-redux';
import './styles.css'

const Carousel = () => {
  return (
    <div class="carousel-selection">
      <svg
        class="icon-arrow-right"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.1923 15.7071C19.5829 15.3166 19.5829 14.6834 19.1923 14.2929L12.1213 7.2218C11.7307 6.83128 11.0976 6.83128 10.7071 7.2218C10.3165 7.61233 10.3165 8.24549 10.7071 8.63602L17.071 15L10.7071 21.3639C10.3165 21.7545 10.3165 22.3876 10.7071 22.7782C11.0976 23.1687 11.7307 23.1687 12.1213 22.7782L19.1922 15.7072C19.1922 15.7072 19.1923 15.7071 19.1923 15.7071Z"
          fill="#636366"
        />
      </svg>

      <svg
        class="icon-arrow-left"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.70708 14.2929C9.31655 14.6834 9.31655 15.3166 9.70708 15.7071L16.7781 22.7782C17.1687 23.1687 17.8018 23.1687 18.1924 22.7782C18.5829 22.3877 18.5829 21.7545 18.1924 21.364L11.8284 15L18.1924 8.63606C18.5829 8.24554 18.5829 7.61237 18.1924 7.22185C17.8018 6.83132 17.1687 6.83132 16.7781 7.22185L9.70722 14.2928C9.70718 14.2928 9.70713 14.2929 9.70708 14.2929Z"
          fill="#636366"
        />
      </svg>
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
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);