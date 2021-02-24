import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Car from "./Car";

class TabPanel extends React.Component {
    render() {
        const { children, value, fileName, cars, isLoading, index, ...other } = this.props;
        
        return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{width:'100%', height: '100%', backgroundColor:'white', color: 'black', paddingLeft: '4%'}}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                    <section className="container">
                        {isLoading ? (
                            (fileName === '') ? (
                                <div className="loader">
                                    <span className="loader__text">
                                        <h1>Upload Video File...</h1>
                                    </span>
                                </div>
                            ) : (
                                <div className="loader">
                                    <span className="loader__text">
                                        <h1>Loading...</h1>
                                    </span>
                                </div>
                            )
                        ) : (
                            <div className="cars">
                                {cars.map(car => 
                                    <Car
                                        key={car.id}
                                        videoName = {fileName}
                                        id={car.car_id}
                                        type = {car.car_type}
                                        frames = {`${car.begin_frame} - ${car.exit_frame}`}
                                        images = {car.images}
                                    />
                                )}
                            </div>
                        )}
                    </section>
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