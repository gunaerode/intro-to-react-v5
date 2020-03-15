import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends React.Component {
  state = { loading: true };
  componentDidMount() {
    // Note: below line will throw error if you want to test error boundary
    // throw new Error(":shit:"); 
    pet
      .animal(this.props.id) // get id from url /details/:id
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}. ${animal.contact.address.state}`,
          description: `${animal.description}`,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      }, console.error);
  }
  render() {
    const {
      name,
      animal,
      location,
      description,
      media,
      breed,
      loading
    } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props}/>
    </ErrorBoundary>
  );
};