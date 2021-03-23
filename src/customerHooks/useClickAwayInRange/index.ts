import { useEffect, useRef } from 'react';
import { useClickAway } from 'ahooks';
import { MutableRefObject } from 'react';
export declare type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | MutableRefObject<T | null | undefined>;
declare type TargetElement = HTMLElement | Element | Document | Window;

/**
 * 在ahooks的useClickAway基础上，增加了区域限制。只有在rangeTarget区域内鼠标事件生效
 * @param {(event: (MouseEvent | TouchEvent)) => void} onClickAway
 * @param {BasicTarget | BasicTarget[]} target
 * @param {BasicTarget} rangeTarget
 * @param {string} eventName
 */
export const useClickAwayInRange = (
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: BasicTarget | BasicTarget[],
  rangeTarget?: BasicTarget,
  eventName?: string,
): void => {
  if (eventName === void 0) {
    eventName = 'click';
  }
  let onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  useEffect(function () {
    const handler = function handler(event) {
      const targets = Array.isArray(target) ? target : [target];
      const result = targets.some(function (targetItem) {
        const targetElement = getTargetElement(targetItem);
        return !targetElement || (targetElement === null || targetElement === void 0 ? void 0 : targetElement.contains(event.target));
      })
      const rangeElement = getTargetElement(rangeTarget);
      const result2 = !!rangeElement && !(rangeElement.contains(event.target));
      if (result || result2) {return;}

      onClickAwayRef.current(event);
    };

    document.addEventListener(eventName, handler);
    return function () {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName, rangeTarget]);
}

export const getTargetElement = (
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null => {
  if (!target) {
    return defaultElement;
  }
  let targetElement;
  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}
