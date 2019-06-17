import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './AutoCompleteInput.scss';

export default (props) => {
  const { searchAPI } = props;
  const [typedText, setTypedText] = useState('');
  const [autoCompletionList, setAutoCompletionList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!isSelected) {
      searchAPI(typedText)
        .then(valueList => setAutoCompletionList(
          valueList.map(value => ({ value, focus: false })),
        ));
    }
    return () => setIsSelected(false);
  }, [typedText]);

  const focusOn = targetIdx => setAutoCompletionList(autoCompletionList
    .map((autoCompletion, idx) => {
      if (idx === targetIdx) autoCompletion.focus = true;
      return autoCompletion;
    }));

  const defocus = targetIdx => setAutoCompletionList(autoCompletionList
    .map((autoCompletion, idx) => {
      if (idx === targetIdx) autoCompletion.focus = false;
      return autoCompletion;
    }));

  const select = (targetIdx) => {
    setIsSelected(true);
    setTypedText(autoCompletionList[targetIdx].value);
    setAutoCompletionList([]);
  };

  const handleTextInputKeyPress = (event) => {
    const { keyCode } = event;
    const curFocusedIdx = _.findIndex(autoCompletionList, { focus: true });
    if (keyCode === 40) { // arrow down
      defocus(curFocusedIdx);
      focusOn((curFocusedIdx + 1) % autoCompletionList.length);
    } else if (keyCode === 38) { // arrow up
      defocus(curFocusedIdx);
      if (curFocusedIdx < 0) {
        focusOn(autoCompletionList.length - 1);
      } else {
        focusOn((curFocusedIdx - 1) % autoCompletionList.length);
      }
    } else if (keyCode === 13) { // enter
      select(curFocusedIdx);
    }
  };
  const handleTextInputChange = (event) => {
    setTypedText(event.target.value);
    console.log(typedText);
  };

  const renderAutoCompleteListDiv = (autoCompletionList) => {
    if (autoCompletionList.length === 0) return null;
    return (
      <div className="auto-complete-list-div">
        {autoCompletionList.map((autoCompletion, idx) => {
          const { value, focus } = autoCompletion;
          return (
            <p
              key={`auto-completion-${value}`}
              className={focus ? 'focused' : 'defocused'}
              onMouseOver={() => focusOn(idx)}
              onFocus={() => focusOn(idx)}
              onMouseOut={() => defocus(idx)}
              onBlur={() => defocus(idx)}
              onClick={() => select(idx)}
            >
              {value}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="auto-complete-input">
      <input type="text" onKeyUp={handleTextInputKeyPress} onChange={handleTextInputChange} value={typedText} />
      {renderAutoCompleteListDiv(autoCompletionList)}
    </div>
  );
};
