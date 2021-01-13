import React from "react";
import TitleBar from "../components/TitleBar"
import Contents from "../components/Contents"

function Main() {
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
        return;
    }
    setDrawerOpen(open);
  }

  return (
    <>
        <p id="back-to-top-anchor" />
        <TitleBar handleTabChange={handleTabChange} value = {value} handleToggleDrawer={handleToggleDrawer}></TitleBar>
        <Contents value = {value} drawerOpen={drawerOpen} handleToggleDrawer={handleToggleDrawer}></Contents>
    </>
  );
}

export default Main;