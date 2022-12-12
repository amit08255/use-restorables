# Use-Restorables

Simple hook to create restorable value state storage for React. It is useful for cases when you need to create a state storage which needs to be restored. It can even persist value when component is unmounted. This simple hook allows you to keep track of both old and new state values.

## Usage

```ts
const { value, setValue, resetValue, restoreValue, applyValue } = useRestorableValue({
  id: "account-values",
  shouldRestoreOldValue: true,
  initialValue: {
      accountName: "Hello",
      status: "World"
  },
});
```

## Options

* **id:** ID used to identify storage and keep values in memory.
* **shouldRestoreOldValue:** When `true` it will restore initial values from memory otherwise the initial values will be set from option `initialValue`.
* **initialValue:** Initial value for setting in restorables.

## Return Value

* **value:** Value in restorables storage.
* **setValue:** Set current value in restorables.
* **resetValue:** Reset restorable value to initial value provided.
* **restoreValue:** Restore value to last applied value.
* **applyValue:** Applies value i.e. sets new value as current value in restorables. It is like saving a document. Unless a value is applied, it is not saved.

## Example

```tsx
import * as React from "react";
import ReactDOM from "react-dom";
import useRestorableValue from './useRestorableValue';

function Filter() {
  const { value, setValue, resetValue, restoreValue, applyValue } = useRestorableValue({
  id: "account-values",
  shouldRestoreOldValue: true,
  initialValue: {
      accountName: "Hello",
      status: "World"
  },
});

  const onChange = (key) => (val) => {
    setValue((value) => ({ ...value, [key]: val }));
  };

  return (
    <main>
      {Object.keys(value).map((key, index) => (
        <input
          key={`value-input-${index + 1}`}
          value={value[key]}
          onChange={(e) => onChange(key)(e.target.value)}
        />
      ))}
      <button onClick={resetValue}>Reset</button>
      <button onClick={restoreValue}>Restore</button>
      <button onClick={() => applyValue(value)}>Apply</button>
    </main>
  );
}

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <main>
      <button onClick={() => setIsOpen((x) => !x)}>
        {isOpen ? "Close Filter" : "Open Filter"}
      </button>
      {isOpen ? <Filter /> : null}
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
```
