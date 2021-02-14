import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { 
    Divider,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Chip,
    Button,
    Typography
} from '@material-ui/core';
import { 
    ExpandMore as ExpandMoreIcon    
} from '@material-ui/icons';
import ReactPlayer from 'react-player'

const styles = (theme)=>({
    root: {
        width: `calc(${window.innerWidth}*0.3px)`,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class ConditionDrawer extends React.Component{
    state={
        expanded: 'panel1',
    }
    handleChange = (panel) => (event, isExpanded) => {
        if(!isExpanded) {
            this.setState({ expanded: false })
        }
        else {
            this.setState({ expanded: panel })
        }
    };
    render(){
        const { classes } = this.props;
        const { expanded } = this.state;
        console.log(this.props.video)
        return(
            <div className={classes.root}>
                <Accordion defaultExpanded expanded = {expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Result</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>See your net result</Typography>
                    </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column} />
                        <div className={classes.column}>
                            <Chip label="Barbados" onDelete={() => {}} />
                        </div>
                        <div className={clsx(classes.column, classes.helper)}>
                            <Typography variant="caption">
                                Select your destination of choice
                                <br />
                                <a href="#secondary-heading-and-columns" className={classes.link}>
                                    Learn more
                                </a>
                            </Typography>
                        </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" color="primary">
                            Load
                        </Button>
                    </AccordionActions>
                </Accordion>

                <Accordion expanded = {expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2c-content"
                        id="panel2c-header"
                    >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Debug</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>See your net deubg</Typography>
                    </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column} />
                        <div className={classes.column}>
                            <Chip label="Barbados" onDelete={() => {}} />
                        </div>
                        <div className={clsx(classes.column, classes.helper)}>
                            <Typography variant="caption">
                                Select your destination of choice
                                <br />
                                <a href="#secondary-heading-and-columns" className={classes.link}>
                                    Learn more
                                </a>
                            </Typography>
                        </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" color="primary">
                            Load
                        </Button>
                    </AccordionActions>
                </Accordion>
                <Divider />
                <ReactPlayer url={this.props.video} />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ConditionDrawer);