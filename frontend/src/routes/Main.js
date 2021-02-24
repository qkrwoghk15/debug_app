import React from "react";
import TitleBar from "../components/TitleBar"
import Contents from "../components/Contents"

import { CarList } from '../api/api';

function Main() {
  const [value, setValue] = React.useState(0);
  const [fileName, setFileName] = React.useState('');
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getCars = async (fileName, index) => {
    const {data} = await CarList(fileName, index)
    setCars(data)
    setIsLoading(false)
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if(fileName !== '')
      setCars([])
      setIsLoading(true)
      getCars(fileName, newValue)
  };

  const uploadFile = (e) => {
    setFileName(e.target.value.split('\\').slice(-1))
    getCars(e.target.value.split('\\').slice(-1), value)
  }

  return (
    <>
        <p id="back-to-top-anchor" />
        <TitleBar handleTabChange={handleTabChange} fileName = {fileName} uploadFile={uploadFile}></TitleBar>
        <Contents value = {value} fileName = {fileName} cars={cars} isLoading={isLoading}></Contents>
    </>
  );
}

export default Main;