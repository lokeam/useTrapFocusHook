# React use-focus-trap Hook
A lightweight React hook that constrains accessibility-related keyboard navigation, specifically forwards (`Tab`) and backwards (`Shift` + `Tab`) movement, to a particular parent DOM node.

This functionality is useful if you want to trap active focus within a UI component such as a Modal or Dialog Box.



For more information on focus management, please visit the [W3C's Web Accessibility Initiative Aria Authoring Practice Guide](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).

## Usage
1. Import the hook into your project.
```javascript
import useFocusTrap from "../hooks/use-focus-trap";
```

2. Destructure the `trapFocusWithinElement` method from `use-focus-trap`.
```javascript
const { trapFocusWithinElement } = useFocusTrap();
```

3. Configure the options you want to use and pass them into `use-focus-trap`. More information on available in the Options section below.
```javascript
const focusTrapOptions = {
  isAlertDialog: true,
  isOpen: isOpen,
  overrideId: 'confirm'
}

const { trapFocusWithinElement } = useFocusTrap(focusTrapOptions);
```

4. Pass the `trapFocusWithinElement` method into the ref attribute of the DOM element you wish to apply trap focus.
```javascript
<div className="modal__wrapper" ref={trapFocusWithinElement}>
```

5. There you have it. You're done.

## Custom Options
| Name         | Property | Description |
|------------- | -------- | ----------- |
|`isAlertDialog` | boolean  | A flag to disable setting initial focus on the first chronological focusable element within the parent DOM node.
|`isOpen`        | boolean  | A flag to add or remove event listeners if the Modal is open or unmounted. |
| `overrideId` | string | Set this string as the id attribute to whichever focusable DOM element that you wish to apply initial focus. Used in conjunction with `isAlertDialog`.

## License
Licensed under the MIT license.

Demo bootstrapped with [React + Vite](https://vitejs.dev/guide/) using HMR and some ESLint rules.
