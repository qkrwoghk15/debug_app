import React from 'react';
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={classes.root}>
        <StyledTabs 
          value={props.value} 
          onChange={props.handleTabChange}
          variant = "scrollable"
          scrollButtons="auto"
          aria-label="styled tabs"
        >
          <StyledTab label="car1" {...a11yProps(0)} />
          <StyledTab label="car2" {...a11yProps(1)} />
          <StyledTab label="car3" {...a11yProps(2)} />
          <StyledTab label="car4" {...a11yProps(3)} />
          <StyledTab label="car5" {...a11yProps(4)} />
          <StyledTab label="car6" {...a11yProps(5)} />
          <StyledTab label="car7" {...a11yProps(6)} />
          <StyledTab label="car8" {...a11yProps(7)} />
        </StyledTabs>
    </div>
  );
}
