import React, { useRef, useLayoutEffect, useEffect } from "react";
import { TweenMax, TweenLite } from "gsap/all";

function R(max) {
  return Math.random() * max;
}

function Background(props) {
  const total = props.total;
  const ref = useRef();

  useLayoutEffect(() => {
    const container = ref.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dots = [];

    // -----------------------------------------------------
    function addAnimation(divElm) {
      return TweenLite.to(divElm, R(20) + 10, {
        left: R(w),
        right: R(w),
        top: R(h),
        bottom: R(h),
        opacity: R(1),
        scale: R(1) + 1,
        delay: R(2),
        backgroundColor: "yellow",
        boxShadow: "0px 0px 10px 2px yellow",
        onComplete: addAnimation,
        onCompleteParams: [divElm],
      });
    }
    // -----------------------------------------------------

    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");

      TweenLite.set(div, {
        css: {
          width: "4px",
          height: "4px",
          backgroundColor: "rgb(47, 128, 237)",
          position: "absolute",
          boxShadow: "0px 0px 10px 2px rgb(47, 128, 237)",
          borderRadius: "20px",
          left: R(w),
          right: R(w),
          top: R(h),
          bottom: R(h),

          opacity: 0.5,
        },
      });

      container.appendChild(div);
      const dot = addAnimation(div);
      dot.play();
      dots.push(dot);
    }
    // -----------------------------------------------------

    return () => {
      dots.forEach((dot) => dot.kill());
      container.innerHTML = "";
    };

    // -----------------------------------------------------
  }, [total]);

  return (
    <div
      style={{ width: "100%", height: "100%", position: "absolute" }}
      ref={ref}
    />
  );
}

export default Background;
