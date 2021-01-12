import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { 
    MoveToInbox as InboxIcon,
    Mail as MailIcon,
} from '@material-ui/icons';

const styles = (theme)=>({
    list: {
        width: `calc(${window.innerWidth}*0.4px)`,
    },
});

class ConditionDrawer extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div
                className={classes.list}
                role="presentation"
                onClick={this.props.toggleDrawer(false)}
                onKeyDown={this.props.toggleDrawer(false)}
            >
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>  
        );
    }
}

export default withStyles(styles, { withTheme: true })(ConditionDrawer);