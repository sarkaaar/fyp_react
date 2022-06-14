import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default class DemoCarousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel className="sm:w-full md:w-full lg:w-96">
        {this.props.data &&
          this.props.data.map((item) => (
            <div key={item}>
              <img src={item} />
            </div>
          ))}
      </Carousel>
    );
  }
}
