import React, { Component } from "react";
import { images } from "assets";

export class Counter extends Component {
  offset = new Date().getTimezoneOffset() / 2;

  state = {
    horaInicio: 0,
    horaFin: 0,
    total: 0,
    start: false,
    count: new Date(this.offset * 60000).toLocaleTimeString("en-GB"),
    milisec: 0,
    inicio: 0,
  };

  startTimer = () => {
    if (this.state.milisec === 0)
      this.setState({ horaInicio: new Date().getTime() });
    setInterval(() => {
      if (this.state.start) {
        this.setState((state) => ({
          milisec: new Date().getTime() - this.state.horaInicio,
          count: new Date(
            this.state.milisec + this.offset * 60000
          ).toLocaleTimeString("en-GB"),
        }));
      }
    }, 1000);
  };

  componentDidMount() {
    this.startTimer();
  }

  renderButtonImg = () => {
    if (this.state.start) {
      return <img src={images.pause} alt="pause" className="w-[100px]" />;
    } else {
      if (this.state.count === 0)
        return <img src={images.play} alt="play" className="w-[100px]" />;
      else
        return (
          <>
            <img src={images.reload} alt="reload" className="w-[100px]" />
          </>
        );
    }
  };

  renderStop = () => {
    if (!this.state.start && this.state.milisec > 0) {
      return <img src={images.stop} alt="stop" className="w-[100px]"></img>;
    }
  };

  render() {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Counter</h1>
        <h2 className="text-2xl font-bold">{this.state.count}</h2>
        <h2 className="text-xl font-semibold">{this.state.milisec}</h2>
        <div className="flex justify-center items-center">
          <button
            className="mx-4"
            onClick={() => {
              this.setState({ start: !this.state.start });
            }}
          >
            <this.renderButtonImg />
          </button>
          <button
            className=" mx-4 "
            onClick={() => {
              this.setState({
                count: new Date(this.offset * 60000).toLocaleTimeString(
                  "en-GB"
                ),
                milisec: 0,
              });
            }}
          >
            <this.renderStop />
          </button>
        </div>

        <div className="text-xl font-semibold">
          timezone offset : {this.offset} min
        </div>
      </div>
    );
  }
}

export default Counter;
