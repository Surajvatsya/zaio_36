import React, { Component } from "react";
import Modal from "../../components/Wrappers/Modal/Modal";
import ReactPlayer from "react-player";
// import { withRouter } from "react-router-dom";
import "./code.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import getDemo from 'actions/services/getDemo';
// import lectureService from "actions/services/lecture.service";
import { Button, Dropdown } from "react-bootstrap";
// import { isThisTypeNode } from "typescript";

const Msg = ({
  closeToast,
  toastProps,
  updateURL,
  URL,
  ToastState,
  stopPlaying,
  hidePlayer,
}) => {
  const update = () => {
    updateURL(URL);
    toast(<Msg2 stopPlaying={stopPlaying} hidePlayer={hidePlayer} />);
    ToastState(true);
    closeToast();
  };

  const close = () => {
    ToastState(true);
    closeToast();
  };

  return (
    <div>
      <span style={{ color: "black", fontSize: "16px" }}>
        Instructor pushed changes to the code editor. Would you like to accept
        the changes?
      </span>
      <br></br>
      <span style={{ fontSize: "12px", color: "red" }}>
        Note: You will lose any changes you may have made in the editor
      </span>
      <br></br>
      <Button
        style={{ marginRight: "5px" }}
        variant='success'
        size='sm'
        onClick={(e) => update()}
      >
        Accept
      </Button>
      <Button variant='danger' size='sm' onClick={(e) => close()}>
        Reject
      </Button>
    </div>
  );
};

const Msg2 = ({ closeToast, toastProps, stopPlaying, hidePlayer }) => {
  const mini = () => {
    stopPlaying();
    hidePlayer();
    closeToast();
  };

  const close = () => {
    closeToast();
  };

  return (
    <div>
      <span style={{ color: "black", fontSize: "16px" }}>
        The code has been updated successfully!
      </span>
      <br></br>
      <Button
        style={{ marginRight: "5px" }}
        variant='success'
        size='sm'
        onClick={(e) => mini()}
      >
        Minimize Player
      </Button>
      <Button variant='warning' size='sm' onClick={(e) => close()}>
        Ignore
      </Button>
    </div>
  );
};

class Code extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      show: true,
      prevCheckpoint: 0,
      showminimize: false,
      shownextbutton: false,
      speed: "1",
      checkpointurl: "",
      toastcheck: true,
    };
  }

  showPlayer = () => {
    console.log("showPlayer");
    this.setState({ show: true });
  };
  hidePlayer = () => {
    console.log("hidePlayer");
    this.setState({ show: false });
  };
  stopPlaying = () => {
    console.log("stopPlayer");

    this.setState({ playing: false });
  };
  startPlaying = () => {
    console.log("startPlayer");
    this.setState({ playing: true });
  };
  updatePrevCheckpoint = (cp) => {
    console.log("updatePrevChackpoint");
    this.setState({ prevCheckpoint: cp });
  };
  updateURL = (checkpointurl) => {
    console.log("updateURL", checkpointurl);
    return this.setState({ checkpointurl }, () => true);
  };
  updatecheckpointPause = (checkpointpause) => {
    console.log("checkpointpause", checkpointpause);
    return this.setState({ checkpointpause: checkpointpause });
  };
  hideMinimize = () => {
    return this.setState({ showminimize: false });
  };
  showMinimize = () => {
    console.log("show minimize");
    return this.setState((prev) => ({ showminimize: true }));
  };
  showNextButton = () => {
    console.log("shownextbutton");
    return this.setState({ shownextbutton: true });
  };

  ToastState = (x) => {
    this.setState({ toastcheck: x });
  };

  redirectToNextLecture = () => {
    this.props.history.push("/allcourses");
  };

  render() {
    let editorStyles = {
      position: "fixed",
      top: "33px",
      zIndex: "0",
      width: "100%",
      height: "calc(100vh - 33px)",
      border: "0",
    };
    console.log(this.state.checkpointurl.substring(0, 8));
    let url =
      this.state.checkpointurl.substring(0, 8) === "https://"
        ? this.state.checkpointurl
        : "https://codesandbox.io/embed/" +
          this.state.checkpointurl +
          "?fontsize=14&theme=dark";
    if (this.props.lecture.editor === "paiza") {
      editorStyles = { ...editorStyles, top: "11px" };
      url =
        "https://paiza.io/projects/e/" +
        this.state.checkpointurl +
        "?theme=twilight";
    }
    return (
      <div style={{ position: "relative" }}>
        <ToastContainer
          position='top-right'
          autoClose={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          style={{ zIndex: 10000 }}
        />
        <Modal
          position='absolute'
          style={{
            display: this.state.show ? "flex" : "none",
            paddingTop: "35px",
          }}
          onClick={(e) => {
            this.hideMinimize();
            this.hidePlayer();
            this.stopPlaying();
            e.stopPropagation();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative" }}
          >
            <ReactPlayer
              url='https://zaiocontent.s3.eu-west-2.amazonaws.com/interactive-env+1.mp4'
              playing={this.state.playing}
              playbackRate={this.state.speed}
              controls={true}
              stopOnUnmount={true}
              pip={!this.state.show}
              onDisablePIP={() => {
                this.showPlayer();
              }}
              progressInterval={
                this.state.speed === 2
                  ? "400"
                  : this.state.speed === 1.5
                  ? "800"
                  : this.state.speed === 1.75
                  ? "500"
                  : this.state.speed === 1.25
                  ? "800"
                  : "1000"
              }
              onProgress={(data) => {
                //console.log('onprogressdata',data)

                if (data.played === 1) {
                  this.redirectToNextLecture();
                } else if (data.played > 0.9) {
                  this.showNextButton();
                }

                if (
                  this.props.lecture.checkpoint.some((item) => {
                    if (
                      item.checkpointtime === Math.floor(data.playedSeconds)
                    ) {
                      this.updatecheckpointPause(item.checkpointpause);
                      if (data.playedSeconds < 5) {
                        this.updateURL(item.checkpointdataurl);
                      } else {
                        if (this.state.toastcheck === true) {
                          toast(
                            <Msg
                              updateURL={this.updateURL}
                              URL={item.checkpointdataurl}
                              ToastState={this.ToastState}
                              stopPlaying={this.stopPlaying}
                              hidePlayer={this.hidePlayer}
                            />
                          );
                          this.setState({ toastcheck: false });
                          if (this.state.checkpointpause === "true") {
                            this.stopPlaying();
                          }
                        }
                      }
                      return true;
                    }
                    return false;
                  })
                ) {
                  if (
                    Math.floor(data.playedSeconds) > 5 &&
                    Math.floor(data.playedSeconds) !== this.state.prevCheckpoint
                  ) {
                    if (this.state.checkpointpause === "true") {
                      this.stopPlaying();
                    }
                    if (this.state.prevCheckpoint !== 0) {
                      this.showMinimize();
                    }
                  }

                  this.updatePrevCheckpoint(Math.floor(data.playedSeconds));
                }
                // if(this.state.checkpoint.includes(Math.floor(data.playedSeconds)) && Math.floor(data.playedSeconds)!==this.state.prevCheckpoint){
                //     console.log(Math.floor(data.playedSeconds));
                //     this.stopPlaying();
                //     // this.hidePlayer();
                //     this.updatePrevCheckpoint(Math.floor(data.playedSeconds));
                // }
                else {
                  this.hideMinimize();
                }
              }}
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              onContextMenu={(e) => e.preventDefault()}
              onPause={(e) => this.stopPlaying()}
              onPlay={this.startPlaying}
              onClickPreview={() => {
                this.startPlaying();
              }}
              width={"77vw"}
              height={"80%"}
            />

            <div style={{ display: "flex", float: "right" }}>
              <a
                href={`https://chats.landbot.io/v3/H-975303-A6S1FU1LRIEJ95J7/index.html?name=harjot&lecturename="${this.props.lecture.lecturename}"&coursename="${this.props.courseName}"`}
                target='_blank'
              >
                <div className={"supportBtn"}>Get Support</div>
              </a>
              <Dropdown className='speedBtn'>
                <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                  X{this.state.speed}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => this.setState({ speed: "0.75" })}
                  >
                    X0.75
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => this.setState({ speed: "1" })}>
                    X1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => this.setState({ speed: "1.25" })}
                  >
                    X1.25
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => this.setState({ speed: "1.5" })}
                  >
                    X1.5
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => this.setState({ speed: "1.75" })}
                  >
                    X1.75
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => this.setState({ speed: "2" })}>
                    X2
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div
                className={
                  this.state.showminimize ? "minimizeBtnPop" : "minimizeBtn"
                }
                size='md'
                onClick={(e) => {
                  this.stopPlaying();
                  this.hidePlayer();
                  this.hideMinimize();
                }}
              >
                Minimize Player
              </div>
            </div>
          </div>
        </Modal>

        {/* <iframe title="pp" src="" width="100%" height="100%" scrolling="no" seamless="seamless"></iframe> */}

        {/* <iframe 
            
                    src="https://www.jdoodle.com/embed/v0/3nxV"
                    title="React"
                    style={{width:'100%',height:'93.2vh',border:'0'}}
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
                </iframe> */}
        {this.state.checkpointurl && (
          <div id='codeframe'>
            <iframe
              src={url}
              style={editorStyles}
              title='React'
              allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
              sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
            ></iframe>
          </div>
        )}
        <a
          href={`https://chats.landbot.io/v3/H-975303-A6S1FU1LRIEJ95J7/index.html?name=harjot&lecturename="${this.props.lecture.lecturename}"&coursename="${this.props.courseName}"`}
          target='_blank'
        >
          <Button
            style={{
              position: "fixed",
              zIndex: "2",
              top: "2px",
              right: "2px",
              width: "70px",
            }}
            size='sm'
            variant='success'
          >
            Support
          </Button>
        </a>
        <Button
          onClick={this.redirectToNextLecture}
          size='lg'
          variant='primary'
          style={{
            opacity: "90%",
            borderRadius: "0",
            position: "fixed",
            right: "0",
            bottom: "20%",
            zIndex: "10000",
            display: this.state.shownextbutton ? "block" : "none",
          }}
        >
          {" "}
          Next Lecture
        </Button>
        <Button
          onClick={this.showPlayer}
          size='sm'
          variant='primary'
          className='d-md-none'
          style={{
            opacity: "90%",
            position: "fixed",
            bottom: "30px",
            left: "20px",
            zIndex: "2",
            display: !this.state.show ? "block" : "none",
          }}
        >
          VideoPlayer
        </Button>
      </div>
    );
  }
}

export default Code;
