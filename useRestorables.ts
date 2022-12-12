import * as React from "react";

type Options = {
  id: string,
  initialValue: any,
  shouldRestoreOldValue?: boolean,
};

const useRestorableValue = ({ id, initialValue, shouldRestoreOldValue = true }:Options) => {
  const ref = React.useRef(initialValue);
  const [value, setValue] = React.useState(initialValue);

  // load initial value from window storage or by given value
  const loadInitialValue = () => {
    const windowObj = window;

    if (!windowObj.restorableValueStorage) {
      windowObj.restorableValueStorage = {};
    }

    if (shouldRestoreOldValue && windowObj.restorableValueStorage[id]) {
      ref.current = windowObj.restorableValueStorage[id];
      setValue(ref.current);
    } else {
      windowObj.restorableValueStorage[id] = initialValue;
      ref.current = initialValue;
    }
  };

  React.useEffect(() => {
    loadInitialValue();
  }, [id]);

  // Reset value to initial value
  const resetValue = () => {
    const windowObj = window;

    windowObj.restorableValueStorage[id] = initialValue;
    ref.current = initialValue;

    setValue(ref.current);
  };

  // Restore value to previously applied value
  const restoreValue = () => {
    setValue(ref.current);
  };

  // Apply current value to state and storage
  const applyValue = (value) => {
    const windowObj = window;

    ref.current = value;
    windowObj.restorableValueStorage[id] = value;

    setValue(value);
  };

  return {
    value,
    resetValue,
    restoreValue,
    applyValue,
    setValue
  };
};

export default useRestorableValue;

