import React from "react";
import "axios";
import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import "./Car.css";
import { GetImage } from '../api/api';


//movie image slider
//https://codepen.io/ryasan86/pen/ExKRgZx 

class Car extends React.Component {
  state = {
    src: '',
    crop: {
      unit: 'px',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    modalOpen: false,
    detected: '',
    outlier: {'car_1':[],
              'bus_2':[],
              'bus_3':[],
              'trk_4':[],
              'trk_5':[],
              'trk_6':[]},
    g: 255,
    b: 255,
  }

  handleOpen = () => {
    this.setState({modalOpen:true})
  }

  handleClose = () => {
    this.setState({modalOpen:false})
  }

  _getImages = async() =>{
    const frame_image = GetImage(this.props.videoName, this.props.images);
    frame_image.then((value)=>{
      this.setState({src: value.data[0].scene_image})
    })
  }

  _countDetected = () => {
    this.setState({detected: `${this.props.images.length} detected`})
  }

  _findOutlier = () =>{
    this.props.images.map((data, index) => (
      this.setState((state)=>{
        return {outlier: this.state.outlier[data.car_type].push(data.frame)}
      })
    ))
    console.log(this.state.outlier)
    //this.setState({outlier: `${this.props.images.length}`})
  }

  componentDidMount(){
    this._getImages();
    this._countDetected();
    this._findOutlier();
  }

  render(){
    const { src, modalOpen, detected, outlier, g, b } = this.state
    const { id, frames, images } = this.props

    return (
      <div className="car" style={{float:'left', backgroundColor: `rgba(255, ${g}, ${b}, 0.25)`}}>
          <img src={ src } alt={id} title={id} onClick={this.handleOpen}/>

          <Modal
            open={modalOpen}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-detectedion"
          >
            <ul className="car__genres">
              {images.map((data, index) => (
                <li className="car__image">
                  <img src={ src } alt={id} title={id} />
                  <p key={index} className="genres__genre">
                    {`[${data.frame}]  ${data.car_type} (${data.confidence*100}%)`}
                  </p>
                </li>
              ))}
            </ul>
          </Modal>

          <div className="car__data">
            <h3 className="car__title">{`Car ID <${id}>`}</h3>
            <h5 className="car__detected">{detected}</h5>
            {
              
            }
            <p className="car__summary">frame: {frames.slice(0, 180)}</p>
          </div>
      </div>
    );
  }
}

Car.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Car;
