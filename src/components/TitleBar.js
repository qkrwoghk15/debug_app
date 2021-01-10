import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Box, 
    InputBase,
    Divider,
    Paper,
} from '@material-ui/core';
import { 
    Menu as MenuIcon, 
    Search as SearchIcon, 
    // MoreVert as MoreIcon 
} from '@material-ui/icons';
import CustomizedTabs from "./CustomizedTabs"
import ConditionDrawer from "./ConditionDrawer"

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

class TitleBar extends React.Component {
    state = {
        fileName: '',
        drawerOpen: false,
    }
    handleChange = (e) => {
        this.setState({
            fileName: e.target.value
        })
    }
    handleDrawerToggle = (e) => {
        this.setState({
            drawerOpen: !this.drawerOpen
        })
    }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Box display="flex" flexDirection="column" flexGrow={1}>
                        <Box display="flex" className={classes.title} flexGrow={1} paddingBottom={2}>
                            <Box display="flex" flexGrow={1}>
                                <Typography  variant="h4" noWrap>
                                    Debug
                                </Typography>
                                <Typography  variant="subtitle2" className={classes.subtitle} noWrap>
                                    debug your app
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
                                        placeholder={this.state.fileName === '' ? "Search Video File" : this.state.fileName}
                                        inputProps={{ 'aria-label': 'Search Video File' }}
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

                        <Box display="flex" flexDirection="row" flexGrow={1}>
                            <Box>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <CustomizedTabs></CustomizedTabs>
                            {/* <Box>
                                <IconButton aria-label="display more actions" edge="end" color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </Box> */}
                        </Box>
                    </Box>
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TitleBar);