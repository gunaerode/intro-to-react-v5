import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // (handleIndexClick)Note: event listener should be arrow function so it wont create context like window etc even if you use normal functions then you need to bind the this in the constructor itself so we can able to access this like this.handleIndexClick = this.handleIndexClick.bind(this) this is also slow one because constructor calls to many times

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };

  // If you dont want to use dataset to take attribut from html element use below but below one will be very expensive 2 years before but still slow in older browsers so use above one

  //   handleIndexClick = index => {
  //     this.setState({
  //       active: index
  //     });
  //   };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            // eslint-disable-next-line
            return (
              <img
                src={photo}
                alt="animal thumnail"
                key={photo}
                onClick={this.handleIndexClick}
                data-index={index}
                className={index === active ? "active" : ""}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
