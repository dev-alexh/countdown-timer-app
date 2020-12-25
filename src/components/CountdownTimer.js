import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown, faHistory, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerType: "Session",
            playing: false,
            sessionTimeLeft: "25:00"
        };

        this.sound = React.createRef();
        this.resetTimer = this.resetTimer.bind(this);
        this.breakIncrement = this.breakIncrement.bind(this);
        this.breakDecrement = this.breakDecrement.bind(this);
        this.sessionIncrement = this.sessionIncrement.bind(this);
        this.sessionDecrement = this.sessionDecrement.bind(this);
        this.playOrPause = this.playOrPause.bind(this);
        this.countDownTimer = this.countDownTimer.bind(this);
    }

    resetTimer() {
        clearInterval(this.countDown);
        this.sound.current.pause();
        this.sound.current.currentTime = 0;
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerType: "Session",
            playing: false,
            sessionTimeLeft: "25:00"
        });
    }

    breakIncrement() {
        this.setState((state) => {
            if (state.breakLength < 60 && !state.playing) {
                if (state.timerType == "Break") {
                    if (state.breakLength < 9) {
                        return {
                            breakLength: state.breakLength + 1,
                            sessionLength: state.sessionLength,
                            timerType: state.timerType,
                            playing: state.playing,
                            sessionTimeLeft: "0" + (state.breakLength + 1) + ":00"
                        };
                    }
                    return {
                        breakLength: state.breakLength + 1,
                        sessionLength: state.sessionLength,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: state.breakLength + 1 + ":00"
                    };
                }
                return {
                    breakLength: state.breakLength + 1,
                    sessionLength: state.sessionLength,
                    timerType: state.timerType,
                    playing: state.playing,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            }
        });
    }

    breakDecrement() {
        this.setState((state) => {
            if (state.breakLength > 1 && !state.playing) {
                if (state.timerType == "Break") {
                    if (state.breakLength < 11) {
                        return {
                            breakLength: state.breakLength - 1,
                            sessionLength: state.sessionLength,
                            timerType: state.timerType,
                            playing: state.playing,
                            sessionTimeLeft: "0" + (state.breakLength - 1) + ":00"
                        };
                    }
                    return {
                        breakLength: state.breakLength - 1,
                        sessionLength: state.sessionLength,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: state.breakLength - 1 + ":00"
                    };
                }
                return {
                    breakLength: state.breakLength - 1,
                    sessionLength: state.sessionLength,
                    timerType: state.timerType,
                    playing: state.playing,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            }
        });
    }

    sessionIncrement() {
        this.setState((state) => {
            if (state.sessionLength < 60 && !state.playing) {
                if (state.timerType == "Session") {
                    if (state.sessionLength < 9) {
                        return {
                            breakLength: state.breakLength,
                            sessionLength: state.sessionLength + 1,
                            timerType: state.timerType,
                            playing: state.playing,
                            sessionTimeLeft: "0" + (state.sessionLength + 1) + ":00"
                        };
                    }
                    return {
                        breakLength: state.breakLength,
                        sessionLength: state.sessionLength + 1,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: state.sessionLength + 1 + ":00"
                    };
                }
                return {
                    breakLength: state.breakLength,
                    sessionLength: state.sessionLength + 1,
                    timerType: state.timerType,
                    playing: state.playing,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            }
        });
    }

    sessionDecrement() {
        this.setState((state) => {
            if (state.sessionLength > 1 && !state.playing) {
                if (state.timerType == "Session") {
                    if (state.sessionLength < 11) {
                        return {
                            breakLength: state.breakLength,
                            sessionLength: state.sessionLength - 1,
                            timerType: state.timerType,
                            playing: state.playing,
                            sessionTimeLeft: "0" + (state.sessionLength - 1) + ":00"
                        };
                    }
                    return {
                        breakLength: state.breakLength,
                        sessionLength: state.sessionLength - 1,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: state.sessionLength - 1 + ":00"
                    };
                }
                return {
                    breakLength: state.breakLength,
                    sessionLength: state.sessionLength - 1,
                    timerType: state.timerType,
                    playing: state.playing,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            }
        });
    }

    countDownTimer() {
        this.countDown = setInterval(() => {
            this.setState((state) => {
                if (state.playing && state.timerType == "Session") {
                    const arr = state.sessionTimeLeft.split(":");
                    if (arr[1] == "00") {
                        if (arr[0] != "00") {
                            arr[1] = 59;
                            if (arr[0] <= 10) {
                                arr[0] = "0" + (arr[0] - 1);
                            } else {
                                arr[0]--;
                            }
                        } else {
                            this.sound.current.currentTime = 0;
                            this.sound.current.play();
                            if (state.breakLength < 10) {
                                return {
                                    breakLength: state.breakLength,
                                    sessionLength: state.sessionLength,
                                    timerType: "Break",
                                    playing: state.playing,
                                    sessionTimeLeft: "0" + state.breakLength + ":" + "00"
                                };
                            }
                            return {
                                breakLength: state.breakLength,
                                sessionLength: state.sessionLength,
                                timerType: "Break",
                                playing: state.playing,
                                sessionTimeLeft: state.breakLength + ":" + "00"
                            };
                        }
                    } else {
                        if (arr[1] <= 10) {
                            arr[1] = "0" + (arr[1] - 1);
                        } else {
                            arr[1]--;
                        }
                    }

                    return {
                        breakLength: state.breakLength,
                        sessionLength: state.sessionLength,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: arr[0] + ":" + arr[1]
                    };
                }
                if (state.playing && state.timerType == "Break") {
                    const arr = state.sessionTimeLeft.split(":");
                    if (arr[1] == "00") {
                        if (arr[0] != "00") {
                            arr[1] = 59;
                            if (arr[0] <= 10) {
                                arr[0] = "0" + (arr[0] - 1);
                            } else {
                                arr[0]--;
                            }
                        } else {
                            this.sound.current.currentTime = 0;
                            this.sound.current.play();
                            if (state.sessionLength < 10) {
                                return {
                                    breakLength: state.breakLength,
                                    sessionLength: state.sessionLength,
                                    timerType: "Session",
                                    playing: state.playing,
                                    sessionTimeLeft: "0" + state.sessionLength + ":" + "00"
                                };
                            }
                            return {
                                breakLength: state.breakLength,
                                sessionLength: state.sessionLength,
                                timerType: "Session",
                                playing: state.playing,
                                sessionTimeLeft: state.sessionLength + ":" + "00"
                            };
                        }
                    } else {
                        if (arr[1] <= 10) {
                            arr[1] = "0" + (arr[1] - 1);
                        } else {
                            arr[1]--;
                        }
                    }

                    return {
                        breakLength: state.breakLength,
                        sessionLength: state.sessionLength,
                        timerType: state.timerType,
                        playing: state.playing,
                        sessionTimeLeft: arr[0] + ":" + arr[1]
                    };
                }
            });
        }, 1000);
    }

    playOrPause() {
        this.setState((state) => {
            if (state.playing) {
                clearInterval(this.countDown);
                return {
                    breakLength: state.breakLength,
                    sessionLength: state.sessionLength,
                    timerType: state.timerType,
                    playing: false,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            } else {
                return {
                    breakLength: state.breakLength,
                    sessionLength: state.sessionLength,
                    timerType: state.timerType,
                    playing: true,
                    sessionTimeLeft: state.sessionTimeLeft
                };
            }
        });
    }

    render() {
        return (
            <Container>
                <h1>Session and Break: Time it!</h1>
                <Container fluid id="sessionBreakBox">
                    <Row id="breakAndSessionTimer">
                        <Col sm={3}>
                            <p id="break-label">Break Timer:</p>
                            <FontAwesomeIcon
                                icon={faArrowAltCircleUp}
                                className="iconSize"
                                id="break-increment"
                                onClick={this.breakIncrement}
                            />
                            <FontAwesomeIcon
                                icon={faArrowAltCircleDown}
                                className="iconSize"
                                id="break-decrement"
                                onClick={this.breakDecrement}
                            />
                        </Col>
                        <Col sm={3}>
                            <div id="break-length">{this.state.breakLength}</div>
                        </Col>
                        <Col sm={3}>
                            <p id="session-label">Session Timer:</p>
                            <FontAwesomeIcon
                                icon={faArrowAltCircleUp}
                                className="iconSize"
                                id="session-increment"
                                onClick={this.sessionIncrement}
                            />
                            <FontAwesomeIcon
                                icon={faArrowAltCircleDown}
                                className="iconSize"
                                id="session-decrement"
                                onClick={this.sessionDecrement}
                            />
                        </Col>
                        <Col sm={3}>
                            <div id="session-length">{this.state.sessionLength}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{ span: 3, offset: 3 }}>
                            <p id="timer-label">{this.state.timerType}</p>
                            {this.state.playing ? (
                                <FontAwesomeIcon
                                    icon={faPauseCircle}
                                    className="iconSize"
                                    id="start_stop"
                                    onClick={this.playOrPause}
                                />
                            ) : (
                                    <FontAwesomeIcon
                                        icon={faPlayCircle}
                                        className="iconSize"
                                        id="start_stop"
                                        onClick={() => {
                                            this.playOrPause();
                                            this.countDownTimer();
                                        }}
                                    />
                                )}
                            <FontAwesomeIcon
                                icon={faHistory}
                                className="iconSize"
                                id="reset"
                                onClick={this.resetTimer}
                            />
                        </Col>
                        <Col sm={2}>
                            <p id="time-left">{this.state.sessionTimeLeft}</p>
                        </Col>
                        <audio
                            id="beep"
                            ref={this.sound}
                            src="https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/KEYS%20ORGAN%20PIANO%20LOOPS/693[kb]120_hard-happy-piano-line.aif.mp3"
                        />
                    </Row>
                </Container>
            </Container>
        );
    }
}