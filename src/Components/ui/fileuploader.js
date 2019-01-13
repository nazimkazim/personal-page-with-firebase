import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { BarLoader } from 'react-spinners';
import { css } from 'react-emotion';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: ''
  };

  static getDerivedStateProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = filename => {
    //console.log(filename);
    this.setState({
      name: filename,
      isUploading: false
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        //console.log(url);
        this.setState({
          fileURL: url
        });
      });
    this.props.filename(filename);
  };

  render() {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    return (
      <div>
        <span
          style={{ display: 'block', width: '120px', marginBottom: '10px' }}
          className="tag is-primary"
        >
          {this.props.tag}
        </span>
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref(this.props.dir)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
        />

        {this.state.isUploading ? (
          <div>
            <BarLoader
              className={override}
              sizeUnit={'px'}
              size={50}
              width={100}
              height={4}
              color={'#2D7969'}
              loading={this.state.loading}
            />
          </div>
        ) : null}

        {this.state.fileURL ? (
          <div>
            <div className="column is-3">
              <img
                style={{ width: '100%' }}
                src={this.state.fileURL}
                alt={this.state.name}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
