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
    outlier_num: {
      'car_1':0,
      'bus_2':0,
      'bus_3':0,
      'trk_4':0,
      'trk_5':0,
      'trk_6':0,
    },
    outlierMsg: '',
    totalOutlier: 0,
    car_1:[],
    bus_2:[],
    bus_3:[],
    trk_4:[],
    trk_5:[],
    trk_6:[],
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
        switch (data.car_type){
          case 'car_1':
            state.car_1.push(data.frame)
            state.outlier_num['car_1'] += 1
            break;
          case 'bus_2':
            state.bus_2.push(data.frame)
            state.outlier_num['bus_2'] += 1
            break;
          case 'bus_3':
            state.bus_3.push(data.frame)
            state.outlier_num['bus_3'] += 1
            break;
          case 'trk_4':
            state.trk_4.push(data.frame)
            state.outlier_num['trk_4'] += 1
            break;
          case 'trk_5':
            state.trk_5.push(data.frame)
            state.outlier_num['trk_5'] += 1
            break;
          case 'trk_6':
            state.trk_6.push(data.frame)
            state.outlier_num['trk_6'] += 1
            break;
          default:
            break;
        }
      })
    ))
  }

  _setOutlierMsg = () => {
    this.setState({outlierMsg: 'no outlier', totalOutlier: 2, g:200, b: 200})
  }

  componentDidMount(){
    this._getImages();
    this._countDetected();
    this._findOutlier();
    this._setOutlierMsg();
  }

  render(){
    const { src, modalOpen, detected, outlierMsg, g, b } = this.state
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
            <p className="car__summary">{outlierMsg.slice(0, 180)}</p>
            {/* {(type === 'car_1')?(<p className="car__summary"></p>):((outlier_num['car_1']===0)?(<p className="car__summary"></p>):(<p className="car__summary">car_1: {outlier_num['car_1']}</p>))}
            {(type === 'bus_2')?(<p className="car__summary"></p>):((outlier_num['bus_2']===0)?(<p className="car__summary"></p>):(<p className="car__summary">bus_2: {outlier_num['bus_2']}</p>))}
            {(type === 'bus_3')?(<p className="car__summary"></p>):((outlier_num['bus_3']===0)?(<p className="car__summary"></p>):(<p className="car__summary">bus_3: {outlier_num['bus_3']}</p>))}
            {(type === 'trk_4')?(<p className="car__summary"></p>):((outlier_num['trk_4']===0)?(<p className="car__summary"></p>):(<p className="car__summary">trk_4: {outlier_num['trk_4']}</p>))}
            {(type === 'trk_5')?(<p className="car__summary"></p>):((outlier_num['trk_5']===0)?(<p className="car__summary"></p>):(<p className="car__summary">trk_5: {outlier_num['trk_5']}</p>))}
            {(type === 'trk_6')?(<p className="car__summary"></p>):((outlier_num['trk_6']===0)?(<p className="car__summary"></p>):(<p className="car__summary">trk_6: {outlier_num['trk_6']}</p>))} */}
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
