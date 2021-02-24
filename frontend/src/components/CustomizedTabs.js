import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 45,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#2e1534',
  },
  padding: {
    padding: theme.spacing(3),
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)

  function handleResize(e){
    setWindowWidth(window.innerWidth)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
  })

  return (
    <div className={classes.root}>
        <StyledTabs 
          value={props.value} 
          onChange={props.handleTabChange}
          variant = "scrollable"
          scrollButtons="auto"
          aria-label="styled tabs"
          style={{width: `calc(${windowWidth}*0.6px)`}}
        >
          <StyledTab label="car_1" {...a11yProps(0)} />
          <StyledTab label="bus_2" {...a11yProps(1)} />
          <StyledTab label="bus_3" {...a11yProps(2)} />
          <StyledTab label="trk_4" {...a11yProps(3)} />
          <StyledTab label="trk_5" {...a11yProps(4)} />
          <StyledTab label="trk_6" {...a11yProps(5)} />
        </StyledTabs>
    </div>
  );
}
