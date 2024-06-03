import React, { Component } from "react";
import { images } from "assets";

export class Counter extends Component {
  state = {
    horaInicio: 0,
    horaFin: 0,
    total: 0,
    start: false,
    count: "",
    milisec: 0,
    inicio: 0,
  };

  offset = new Date().getTimezoneOffset() / 2;

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

  render() {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Counter</h1>
        <h2 className="text-xl font-semibold">{this.state.count}</h2>
        <h2 className="text-xl font-semibold">{this.state.milisec}</h2>
        <div className="flex justify-center items-center">
          <button
            className="mx-4"
            onClick={() => {
              this.setState({ start: !this.state.start });
            }}
          >
            <img src={images.play} alt="play" className="w-[100px]" />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mx-4 h-[50px]"
            onClick={() => {
              this.setState({ count: 0, milisec: 0 });
            }}
          >
            reset
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
