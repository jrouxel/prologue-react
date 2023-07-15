import React, { useState } from 'react';
import { connect } from 'react-redux';
import conversationHistory from './img/conversationHistory.png'
import languageSelection from './img/languageSelection.png'
import { showLanguagePanel } from '../../redux/actions';
import store from '../../redux/store';
import menu from './img/menu.png'
import { buttonStyles, pressedButtonStyles } from './styles.js';

const Footer = () => {
  const [menuButtonPressed, setMenuButtonPressed] = useState(false);
  const [historyButtonPressed, setHistoryButtonPressed] = useState(false);
  const [languageButtonPressed, setLanguageButtonPressed] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px'}}>
      <button //Menu Button
        style={menuButtonPressed ? pressedButtonStyles : buttonStyles} 
        onMouseDown={() => setMenuButtonPressed(true)}
        onMouseUp={() => setMenuButtonPressed(false)}
        onClick={() => {
          console.log(store.getState().bot.languagePanelOpen);
          store.dispatch(showLanguagePanel(true));
          console.log(store.getState().bot.languagePanelOpen);
        }}
      >
        <img 
        src={menu} 
        alt="loading..." 
        className="mic"
        width="35"
        height="35"
        fill="none"
        />
      </button>

      <button //Conversation History Button
        style={historyButtonPressed ? pressedButtonStyles : buttonStyles} 
        onMouseDown={() => setHistoryButtonPressed(true)}
        onMouseUp={() => setHistoryButtonPressed(false)}
      >
        <img 
        src={conversationHistory}
        alt="loading..." 
        className="mic"
        width="35"
        height="35"
        fill="none"
        />
      </button>

      <button //Language Button
        style={languageButtonPressed ? pressedButtonStyles : buttonStyles} 
        onMouseDown={() => setLanguageButtonPressed(true)}
        onMouseUp={() => setLanguageButtonPressed(false)}
      >
        <img 
        src={languageSelection}
        alt="loading..." 
        className="mic"
        width="35"
        height="35"
        fill="none"
        />
      </button>
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