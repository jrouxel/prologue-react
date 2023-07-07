import React from "react";
import { FixedAspectRatio } from "../../components/FixedAspectRatio";
import "./style.css";

export const Element = () => {
  return (
    <div className="element">
      <div className="mobile-wrapper">
        <div className="mobile">
          <div className="fixed-aspect-ratio-2">
            <div className="center-aligned">
              <div className="wrapper">
                <FixedAspectRatio
                  aspectRatio="golden-ratio-1-618-1"
                  aspectRatioKeeperClassName="fixed-aspect-ratio-spacer"
                  className="vertical-shift"
                  fiftyHeight
                  portrait={false}
                />
                <div className="center-aligned-px">
                  <div className="play-button-small">
                    <div className="overlap-group">
                      <div className="rectangle" />
                      <img className="vector" alt="Vector" src="/img/vector.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FixedAspectRatio
              aspectRatio="golden-ratio-1-618-1"
              aspectRatioKeeperClassName="fixed-aspect-ratio-spacer"
              className="aspect-ratio"
              fiftyHeight={false}
              portrait={false}
            />
          </div>
          <div className="frame">
            <div className="frame-2" />
            <div className="frame-3" />
            <div className="frame-4" />
          </div>
          <img className="line" alt="Line" src="/img/line-4.svg" />
          <div className="frame-5">
            <div className="frame-6" />
            <div className="frame-7" />
            <div className="ellipse" />
            <div className="overlap">
              <div className="ellipse-2" />
              <div className="ellipse-3" />
              <div className="ellipse-4" />
              <div className="frame-8" />
            </div>
          </div>
          <img className="line" alt="Line" src="/img/line-4.svg" />
          <div className="frame-9">
            <div className="aspect-ratio-keeper-wrapper">
              <div className="aspect-ratio-keeper-6" />
            </div>
            <div className="frame-10">
              <div className="frame-11" />
              <div className="frame-12" />
            </div>
          </div>
          <div className="frame-9">
            <div className="aspect-ratio-keeper-wrapper">
              <div className="aspect-ratio-keeper-6" />
            </div>
            <div className="frame-10">
              <div className="frame-11" />
              <div className="frame-12" />
            </div>
          </div>
          <div className="frame-9">
            <FixedAspectRatio
              aspectRatio="one-hundred-and-sixty-nine"
              aspectRatioKeeperClassName="fixed-aspect-ratio-spacer"
              className="fixed-aspect-ratio-instance"
              fiftyHeight={false}
              portrait={false}
            />
            <div className="frame-10">
              <div className="frame-11" />
              <div className="frame-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
