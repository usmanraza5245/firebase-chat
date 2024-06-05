import React from "react";
import JsLoader from "react-js-loader";

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <JsLoader
        type="spinner-circle"
        bgColor={"rgb(99 102 241)"}
        color={"rgb(99 102 241)"}
        // title={"spinner-circle"}
        size={100}
      />
    </div>
  );
}

export default Loader;
