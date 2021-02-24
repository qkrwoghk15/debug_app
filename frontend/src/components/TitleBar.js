import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Box, 
    InputBase,
    Divider,
    Paper,
    CssBaseline,
    useScrollTrigger,
    Zoom,
    Fab,
    SwipeableDrawer,
} from '@material-ui/core';
import { 
    Menu as MenuIcon, 
    Search as SearchIcon, 
    KeyboardArrowUp as KeyboardArrowUpIcon,
    // MoreVert as MoreIcon 
} from '@material-ui/icons';
import ConditionDrawer from "./ConditionDrawer"
import CustomizedTabs from "./CustomizedTabs"

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        minHeight: 80,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        backgroundColor: '#2e1534',
    },
    title: {
        paddingLeft: theme.spacing(7),
    },
    subtitle: {
        paddingLeft: theme.spacing(7),
        alignSelf: "flex-end",
    },
    divider: {
        height: 28,
        margin: 4,
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: '70%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
});

const useStyles = makeStyles((theme) => ({
    bottombtn: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.bottombtn}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

class TitleBar extends React.Component {
    state = {
        //fileName: '',
        drawerOpen: false,
    }
    handleChange = (e) => {
        this.props.uploadFile(e)
        //this.setState({
        //    fileName: e.target.value.split('\\').slice(-1)
        //})
        //ApiCreate(this.state.fileName)
    }
    handleToggleDrawer = (open) => (e) => {
        if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        this.setState({ drawerOpen: open });
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" >
                    <Toolbar className={classes.toolbar}>
                        <Box display="flex" flexDirection="column" flexGrow={1}>
                            <Box display="flex" className={classes.title} flexGrow={1} paddingBottom={2}>
                                <Box display="flex" flexGrow={1}>
                                    <Typography  variant="h4" noWrap>
                                        Debug
                                    </Typography>
                                    <Typography  variant="subtitle2" className={classes.subtitle} noWrap>
                                        debuging Car Re-identification
                                    </Typography>
                                </Box>

                                <Box flexGrow={1}>
                                    <Paper component="form" className={classes.paper} display="flex" flexDirection="row">
                                        <input
                                            accept="video/*"
                                            style = {{display: 'none'}}
                                            id="upload-file"
                                            type="file"
                                            onChange= {this.handleChange}
                                        />
                                        <InputBase
                                            className={classes.input}
                                            placeholder={this.props.fileName === '' ? "Upload Video File" : this.props.fileName}
                                            inputProps={{ 'aria-label': 'Upload Video File' }}
                                            disabled = {true}
                                        />
                                        <Divider className={classes.divider} orientation="vertical" />
                                        <label htmlFor="upload-file">
                                            <IconButton aria-label="upload video" color="inherit" component="span">
                                                <SearchIcon />
                                            </IconButton>
                                        </label>
                                    </Paper>                                
                                </Box>
                            </Box>

                            <Box display="flex" flexDirection="row-reverse" flexGrow={1}>
                                <Box>
                                    <React.Fragment>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={this.handleToggleDrawer(true)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </React.Fragment>
                                </Box>
                                <Box flexGrow={1}>
                                    <CustomizedTabs handleTabChange = {this.props.handleTabChange} value = {this.props.value}></CustomizedTabs>
                                </Box>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                
                <SwipeableDrawer
                    anchor='right'
                    open={this.state.drawerOpen}
                    onClose={this.handleToggleDrawer(false)}
                    onOpen={this.handleToggleDrawer(true)}
                >
                    <ConditionDrawer toggleDrawer = {this.handleToggleDrawer} video = {this.state.fileName}></ConditionDrawer>
                </SwipeableDrawer>

                <ScrollTop {...this.props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TitleBar);