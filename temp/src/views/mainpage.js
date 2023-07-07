import React from 'react'

import { Helmet } from 'react-helmet'

import './mainpage.css'

const Mainpage = (props) => {
  return (
    <div className="mainpage-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="mainpage-mainpage">
        <button className="mainpage-record-button">
          <img
            src="/external/send8632-4698.svg"
            alt="send8632"
            className="mainpage-send"
          />
          <img
            src="/external/mic8632-14b.svg"
            alt="mic8632"
            className="mainpage-mic"
          />
          <img
            src="/external/cancel8632-zgrb.svg"
            alt="cancel8632"
            className="mainpage-cancel"
          />
        </button>
        <div className="mainpage-speechtotext">
          <span className="mainpage-text">
            <span className="mainpage-text1">What is Art Souterrain?</span>
            <span className="mainpage-text2">
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>Abstract design ?</span>
          </span>
        </div>
        <div className="mainpage-robotselection">
          <div className="mainpage-conversationexperience">
            <img
              src="/external/screenshot20230706at85818882-hwv-300h.png"
              alt="Screenshot20230706at85818882"
              className="mainpage-screenshot20230706at8581"
            />
          </div>
          <div className="mainpage-iconarrowright">
            <img
              src="/external/unioni820-9avw.svg"
              alt="UnionI820"
              className="mainpage-union"
            />
          </div>
          <div className="mainpage-iconarrowleft">
            <img
              src="/external/unioni820-951n.svg"
              alt="UnionI820"
              className="mainpage-union1"
            />
          </div>
        </div>
        <div className="mainpage-texttospeech">
          <span className="mainpage-text4">
            <span>Hi there</span>
          </span>
          <span className="mainpage-text6">
            <span>Let’s see what can I do for you?</span>
          </span>
        </div>
        <div className="mainpage-conversationhistory">
          <div className="mainpage-conversationhistory1">
            <img
              src="/external/unioni844-o1vk.svg"
              alt="UnionI844"
              className="mainpage-union2"
            />
          </div>
        </div>
        <img
          src="/external/languageselection8632-beks.svg"
          alt="languageselection8632"
          className="mainpage-languageselection"
        />
        <img
          src="/external/logo8632-i7bl.svg"
          alt="logo8632"
          className="mainpage-logo"
        />
        <div className="mainpage-menu">
          <img
            src="/external/rectangle20688292-nhj-200h.png"
            alt="Rectangle20688292"
            className="mainpage-rectangle2068"
          />
          <img
            src="/external/rectangle68111-5mgr-200h.png"
            alt="Rectangle68111"
            className="mainpage-rectangle6"
          />
          <img
            src="/external/rectangle68111-5mgr-200h.png"
            alt="Rectangle68111"
            className="mainpage-rectangle61"
          />
          <img
            src="/external/rectangle88111-3kw-200h.png"
            alt="Rectangle88111"
            className="mainpage-rectangle8"
          />
        </div>
      </div>
    </div>
  )
}

export default Mainpage
