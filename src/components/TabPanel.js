import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class TabPanel extends React.Component {
    render() {
        const { children, value, index, ...other } = this.props;

        return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{width:'100%', height: '100%', backgroundColor:'white', color: 'black', paddingLeft: '8%'}}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>

                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>
                <Typography>wefwakejf;lawkejfkwjawkjefaw</Typography>

            </Box>
            )}
        </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel;