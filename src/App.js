import React, { useState, useEffect } from 'react';

import { AppBar, IconButton } from '@material-ui/core';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { Menu as MenuIcon } from "@material-ui/icons";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import { StylesProvider } from '@material-ui/core';

// import styled from 'styled-components'
import { OpenCvProvider, useOpenCv } from 'opencv-react'
import Content from './Content';


function App() {
  const [ value, setValue ] = useState(0);
  const handleChange = (event,newValue) => {
    setValue(newValue);
  };
  const onLoaded = (cv) => {
    console.log('opencv loaded, cv')
  }

  return (
    <div>
      <OpenCvProvider onLoad={onLoaded} >
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} textColor='inherit'>
            <Tab label="Introduce"  id='0' />
            <Tab label="Profile"  id='1' />
            <Tab label="Web App" id='2' />
          </Tabs>
        </AppBar>
        <Content value={value}></Content>
      </OpenCvProvider>
    </div>
  );
}
// const Container = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: url(https://source.unsplash.com/random/1920x1080?${props => props.imgname});
//   background-size: cover;
//   `;

// const Input = styled.input`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 190px;
//   height: 33px;
//   paddinga: 3px;
//   background: white;
//   outline: none ;
//   border: none ;
//   font-size: 22px;
//   color: white;
// `;


// function StyledContainer() {
//   return (
//     <StylesProvider injectFirst>
//       <Container></Container>
//     </StylesProvider>
//   );
// }

export default App;
