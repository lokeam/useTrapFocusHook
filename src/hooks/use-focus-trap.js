/*
  1. Get ref of root element to search
  2. Traverse root element, find DOM elements able to receive focus, place in array
  3. Assign refs to array of focusable elements
  4. Set the initial focus on modal
  5. Listen for keydown events to tab forwards or backwards (handler)

  Optimizations:
  -- Add default options config obj?
  -- return null if no root element
  -- take keyboard handler out of hook
*/

import { useCallback } from "react";

export const useFocusTrap = () => {

  const trapFocusWithinElement = useCallback(
    (parentElement) => {
      const focusableElArr = getAllFocusableElements(parentElement);
      console.log('focusableElArr: ', focusableElArr);
    },
    []
  );

  const getAllFocusableElements = (parentElement) => {
    if (!parentElement) return null;
    return Array.from(parentElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  return { trapFocusWithinElement };
}

export default useFocusTrap;
