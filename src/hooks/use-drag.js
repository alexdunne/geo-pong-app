const { useState, useRef, useEffect } = require("preact/hooks");

/**
 * Super basic implementation
 */
const useDrag = (elementRef) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef();
  const offsetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;

    const onMouseDown = (e) => {
      isDragging.current = true;
      offsetPosition.current = { x: e.offsetX, y: e.offsetY };
    };

    const onMouseMove = (e) => {
      if (isDragging.current) {
        setPosition({
          x: e.clientX - offsetPosition.current.x,
          y: e.clientY - offsetPosition.current.y,
        });
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      offsetPosition.current = { x: 0, y: 0 };
    };

    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseup", onMouseUp);

    return () => {
      element.removeEventLister("mousedown", onMouseDown);
      element.removeEventLister("mousemove", onMouseMove);
      element.removeEventLister("mouseup", onMouseUp);
    };
  }, [elementRef]);

  return position;
};

export { useDrag };
