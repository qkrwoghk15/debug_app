import React from "react";
import TitleBar from "../components/TitleBar"
import Contents from "../components/Contents"

function Main() {
  const [value, setValue] = React.useState(0);
  //const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <p id="back-to-top-anchor" />
        <TitleBar handleTabChange={handleTabChange}></TitleBar>
        <Contents value = {value} ></Contents>
    </>
  );
}

export default Main;