import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE_ELEMENTS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const defaultOptions = {
  isAlert: false,
  isOpen: false,
  overrideId: "send",
};

export const useFocusTrap = (customOptions) => {
  const options = customOptions
    ? { ...defaultOptions, ...customOptions }
    : defaultOptions;

  const allFocusableRefs = useRef(null);
  let currentFocusableRefIndex = useRef(null);

  const setInitialFocus = useCallback(() => {
    if (options.isAlertDialog) {
      const overrideIndex = allFocusableRefs.current.findIndex(
        (element) => element.id === options.overrideId
      );
      currentFocusableRefIndex.current = overrideIndex;
      allFocusableRefs.current[overrideIndex].focus();
      return;
    }

    allFocusableRefs.current[0].focus();
  }, [options.isAlertDialog, options.overrideId]);

  const addRefsToFocusableElements = useCallback(
    (focusableElementArray) => {
      allFocusableRefs.current = focusableElementArray;

      setInitialFocus();
    },
    [setInitialFocus]
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
    return Array.from(
      parentElement.querySelectorAll(FOCUSABLE_ELEMENTS)
    );
  };

  const keyboardHandler = useCallback((event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();

    const tabForwards = () => {
      if (
        currentFocusableRefIndex.current !==
        allFocusableRefs?.current.length - 1
      ) {
        currentFocusableRefIndex.current++;
        allFocusableRefs.current[currentFocusableRefIndex.current].focus();
      } else {
        currentFocusableRefIndex.current = 0;
        allFocusableRefs.current[0].focus();
      }
    };

    const tabBackwards = () => {
      if (currentFocusableRefIndex.current === 0) {
        currentFocusableRefIndex.current = allFocusableRefs.current.length - 1;
        allFocusableRefs.current[allFocusableRefs.current.length - 1].focus();
      } else {
        currentFocusableRefIndex.current--;
        allFocusableRefs.current[currentFocusableRefIndex.current].focus();
      }
    };

    if (event.shiftKey) {
      tabBackwards(event);
    } else if (event.key === "Tab") {
      tabForwards(event);
    }
  }, []);

  useEffect(() => {
    if (options.isOpen) {
      window.addEventListener("keydown", keyboardHandler);
      return () => {
        window.removeEventListener("keydown", keyboardHandler);
      };
    }
  }, [options.isOpen, keyboardHandler]);

  return { trapFocusWithinElement };
};

export default useFocusTrap;
