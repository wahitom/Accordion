//  thngs we are going to be able to do with our accordion
// handle opeing a single selection
// handle opening multiple selections

import React from "react";
import { useEffect, useState } from "react";
import data from "./data";
import "./styles.css";
export default function Accordion() {
  // single selection
  // useState hook to handle displaying the single selection

  // enable single selection
  const [selected, setSelected] = useState(null);

  // enable multi selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // enable multiple selected items ie when we select multiple things we have to store multiple ids
  const [multipleSelection, setMultipleSelection] = useState([]);

  // handle the text on the button to say either enable multi selection or disable multiselection
  const [buttonText, setButtonText] = useState("Enable multi-selection");

  // to make sure the text changes
  useEffect(() => {
    setButtonText(
      enableMultiSelection
        ? "Disable multi-selection"
        : "Enable multi-selection"
    );
  }, [enableMultiSelection]);

  function handleSingleSelection(getCurrentId) {
    console.log(getCurrentId);
    //set our seelcted as current id
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // handle {multiselection}
  function handleMultiSelection(getCurrentId) {
    //if an item is clicked its stored in the array
    // this is to avoid mutating any of the other states directly
    let copyMultiple = [...multipleSelection];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    //console.log(findIndexOfCurrentId);

    // vheck if clicked id is in the array
    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      // remove only one item
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }

    setMultipleSelection(copyMultiple);
  }

  //console.log(selected);

  return (
    <div className="wrapper">
      {/* use onClick function to enable multi selection */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {buttonText}
      </button>

      <div className="accordion">
        {/* display our data here */}
        {data && data.length > 0 ? (
          /* map the data */
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? /** if true handle selecting and storing multiple ids */
                      () => handleMultiSelection(dataItem.id)
                    : /**if not then use the single selection function */
                      () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              <div
                className={`content ${
                  (
                    enableMultiSelection
                      ? multipleSelection.indexOf(dataItem.id) !== -1
                      : selected === dataItem.id
                  )
                    ? "show"
                    : ""
                }`}
              >
                {dataItem.answer}
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
