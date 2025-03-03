import React, { useEffect } from "react";
import PageRoute from "./utils/PageRoute";
function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <div className="w-full h-screen  overflow-y-hidden overflow-x-hidden overflow-hidden flex">
        <PageRoute />
      </div>
    </>
  );
}
export default App;
