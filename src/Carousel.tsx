import React from "react";
import { Photo } from "@frontendmasters/pet";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

class Carousel extends React.Component<IProps, IState> {
  public state = {
    photos: [],
    active: 0
  };
  public static getDerivedStateFromProps({
    media
  }: IProps): { photos: string[] } {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // (handleIndexClick)Note: event listener should be arrow function so it wont create context like window etc even if you use normal functions then you need to bind the this in the constructor itself so we can able to access this like this.handleIndexClick = this.handleIndexClick.bind(this) this is also slow one because constructor calls to many times

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };

  // If you dont want to use dataset to take attribut from html element use below but below one will be very expensive 2 years before but still slow in older browsers so use above one

  //   handleIndexClick = index => {
  //     this.setState({
  //       active: index
  //     });
  //   };

  public render() {
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
                role="presentation"
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
