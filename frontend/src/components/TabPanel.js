import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import Movie from "./Movie";

class TabPanel extends React.Component {
    state = {
        isLoading: true,
        movies: []
    };
    getMovies = async () => {
        const {
            data: {
                data: { movies }
            }
        } = await axios.get(
            "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
        );
            this.setState({ movies, isLoading: false });
    };
    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { children, value, index, ...other } = this.props;
        const { isLoading, movies } = this.state;

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
                    <div className="movies">
                        {movies.map(movie => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            title={movie.title}
                            summary={movie.summary}
                            poster={movie.medium_cover_image}
                            genres={movie.genres}
                        />
                        ))}
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