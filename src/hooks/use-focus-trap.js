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

import { useCallback, useEffect, useRef } from "react";

export const useFocusTrap = (isOpen) => {

  const allFocusableRefs = useRef(null);
  let currentFocusableRefIndex = useRef(null);

  const addRefsToFocusableElements = useCallback(
    (focusableElementArray) => {
      allFocusableRefs.current = focusableElementArray;

      // set initial focus
      allFocusableRefs.current[0].focus();
    },
    []
  );

  const trapFocusWithinElement = useCallback(
    (parentElement) => {
      if (!parentElement) return null;
      const allFocusableElements = getAllFocusableElements(parentElement);

      return addRefsToFocusableElements(allFocusableElements);
    },
    [addRefsToFocusableElements]
  );

  const getAllFocusableElements = (parentElement) => {
    if (!parentElement) return null;
    return Array.from(parentElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  const keyboardHandler = useCallback((event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();

    const tabForwards = () => {
      if (currentFocusableRefIndex.current !== allFocusableRefs?.current.length - 1) {
        currentFocusableRefIndex.current++;
        allFocusableRefs.current[currentFocusableRefIndex.current].focus();
      } else {
        currentFocusableRefIndex.current = 0;
        allFocusableRefs.current[0].focus();
      }
    }

    const tabBackwards = () => {
      if (currentFocusableRefIndex.current === 0) {
        currentFocusableRefIndex.current = allFocusableRefs.current.length - 1;
        allFocusableRefs.current[allFocusableRefs.current.length - 1].focus();
      } else {
        currentFocusableRefIndex.current--;
        allFocusableRefs.current[currentFocusableRefIndex.current].focus();
      }
    }

    if (event.shiftKey) {
      tabBackwards(event);
    }
    else if (event.key === 'Tab') {
      tabForwards(event);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', keyboardHandler);
      return () => {
        window.removeEventListener('keydown', keyboardHandler);
      }
    }
  }, [isOpen, keyboardHandler]);

  return { trapFocusWithinElement };
}

export default useFocusTrap;
