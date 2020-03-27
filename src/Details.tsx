import React from "react";
import pet, { AnimalResponse } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  state = { loading: true, showModal: false };
  componentDidMount() {
    // Note: below line will throw error if you want to test error boundary
    // throw new Error(":shit:");

    if (!this.props.id) {
      navigate("/");
      return;
    }
    pet
      .animal(+this.props.id) // get id from url /details/:id
      .then(({ animal }: AnimalResponse) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}. ${animal.contact.address.state}`,
          description: `${animal.description}`,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      })
      .catch((err: Error) => this.setState({ error: err }));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    const {
      name,
      animal,
      location,
      description,
      media,
      breed,
      showModal,
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
          <ThemeContext.Consumer>
            {([themeHook]) => {
              return (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: themeHook }}
                >
                  Adopt {name}
                </button>
              );
            }}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
