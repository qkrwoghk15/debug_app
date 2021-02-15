import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Car from "./Car";

import { ApiList } from '../api/api';

class TabPanel extends React.Component {
    state = {
        isLoading: true,
        cars: [],
    };

    _getCars = async () => {
        const {data} = await ApiList()
        this.setState({ cars: data, isLoading: false });
    };

    async componentDidMount() {
        this._getCars();
    }

    render() {
        const { children, value, index, ...other } = this.props;
        const { isLoading, cars } = this.state;
        
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
                        <div className="loader">
                            <span className="loader__text">Loading...</span>
                        </div>
                        ) : (
                        <div className="cars">
                            {cars.map(car => 
                                <Car
                                    key={car.id}
                                    id={car.id}
                                    year="2021"
                                    title = {car.original_video}
                                    summary = {car.upload_at}
                                    poster = {car.frameImgs}
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