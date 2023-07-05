/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const FixedAspectRatio = ({ aspectRatio, portrait, fiftyHeight, className, aspectRatioKeeperClassName }) => {
  return (
    <div className={`fixed-aspect-ratio fifty-height-${fiftyHeight} ${aspectRatio} portrait-${portrait} ${className}`}>
      <div className={`aspect-ratio-keeper ${aspectRatioKeeperClassName}`}>
        {((!fiftyHeight && aspectRatio === "a4") ||
          (!fiftyHeight && aspectRatio === "eleven") ||
          (!fiftyHeight && aspectRatio === "fifty-four") ||
          (!fiftyHeight && aspectRatio === "forty-three") ||
          (!fiftyHeight && aspectRatio === "letter") ||
          (fiftyHeight && aspectRatio === "a4" && portrait) ||
          (fiftyHeight && aspectRatio === "fifty-four" && portrait) ||
          (aspectRatio === "golden-ratio-1-618-1" && portrait) ||
          (aspectRatio === "one-hundred-and-sixty-nine" && portrait) ||
          (aspectRatio === "one-thousand-six-hundred-and-ten" && portrait) ||
          (aspectRatio === "thirty-two" && portrait) ||
          (aspectRatio === "twenty-one" && portrait) ||
          (aspectRatio === "two-hundred-and-nineteen" && portrait)) && (
          <div className="div">
            {((!fiftyHeight && aspectRatio === "a4" && portrait) ||
              (!fiftyHeight && aspectRatio === "fifty-four" && portrait) ||
              (!fiftyHeight && aspectRatio === "golden-ratio-1-618-1") ||
              (!fiftyHeight && aspectRatio === "one-hundred-and-sixty-nine") ||
              (!fiftyHeight && aspectRatio === "one-thousand-six-hundred-and-ten") ||
              (!fiftyHeight && aspectRatio === "thirty-two") ||
              (!fiftyHeight && aspectRatio === "twenty-one") ||
              (aspectRatio === "forty-three" && portrait) ||
              (aspectRatio === "letter" && portrait) ||
              aspectRatio === "two-hundred-and-nineteen") && (
              <div className="aspect-ratio-keeper-2">
                {(aspectRatio === "golden-ratio-1-618-1" ||
                  aspectRatio === "one-hundred-and-sixty-nine" ||
                  aspectRatio === "one-thousand-six-hundred-and-ten" ||
                  aspectRatio === "twenty-one" ||
                  (!fiftyHeight && aspectRatio === "two-hundred-and-nineteen")) && (
                  <div className="aspect-ratio-keeper-3">
                    {["twenty-one", "two-hundred-and-nineteen"].includes(aspectRatio) && (
                      <div className="aspect-ratio-keeper-4">
                        {aspectRatio === "two-hundred-and-nineteen" && <div className="aspect-ratio-keeper-5" />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

FixedAspectRatio.propTypes = {
  aspectRatio: PropTypes.oneOf([
    "two-hundred-and-nineteen",
    "golden-ratio-1-618-1",
    "one-thousand-six-hundred-and-ten",
    "a4",
    "twenty-one",
    "fifty-four",
    "letter",
    "thirty-two",
    "eleven",
    "one-hundred-and-sixty-nine",
    "forty-three",
  ]),
  portrait: PropTypes.bool,
  fiftyHeight: PropTypes.bool,
};
