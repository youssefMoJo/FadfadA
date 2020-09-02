import React, { useRef, useLayoutEffect } from "react";
import { TweenMax } from "gsap/all";

function R(max) {
  return Math.random() * max;
}

function Background(props) {
  const { total = 40 } = props;
  const ref = useRef();

  useLayoutEffect(() => {
    const container = ref.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dots = [];

    function addAnimation(elm) {
      console.log("object");
      return TweenMax.to(elm, R(20) + 10, {
        bezier: {
          values: [
            {
              x: R(w),
              y: R(h),
            },
            {
              x: R(w),
              y: R(h),
            },
          ],
        },
        opacity: R(1),
        scale: R(1) + 0.5,
        delay: R(2),
        onComplete: addAnimation,
        onCompleteParams: [elm],
      });
    }

    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      TweenMax.set(div, {
        width: "4px",
        height: "4px",
        backgroundColor: "#ff00cc",
        position: "absolute",
        boxShadow: "0px 0px 10px 2px #ff00cc",
        borderRadius: "20px",
        zIndex: "0",
        x: R(w),
        y: R(h),
        opacity: 5,
      });
      container.appendChild(div);
      const dot = addAnimation(div);
      dot.play();
      dots.push(dot);
    }

    return () => {
      // Clear animations and whatever here
      dots.forEach((dot) => dot.kill());
      container.innerHTML = "";
    };
  }, [total]);
  return (
    <div
      style={{ width: "100%", height: "100%", position: "absolute" }}
      className="fireflies"
      ref={ref}
    />
  );
}

export default Background;
