import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="flex space-y-2 flex-col min-h-screen min-w-screen justify-center items-center">
      <ClipLoader color={"#000"} size={70} />
    </div>
  );
};

export default Loading;
