import React, { lazy } from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

// Note: below packages for testing lazy loading with suspense
// import _ from "lodash";
// import moment from "moment";

// Note: https://reactjs.org/docs/code-splitting.html (React.lazy and Suspense are not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we recommend Loadable Components. It has a nice guide for bundle splitting with server-side rendering.)

// const Modal = lazy(() => import("./Modal"));

class Details extends React.Component {
  state = { loading: true, showModal: false };
  componentDidMount() {
    // Note: below line will throw error if you want to test error boundary
    // throw new Error(":shit:");
    pet
      .animal(this.props.id) // get id from url /details/:id
      .then(({ animal }) => {
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
      }, console.error);
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

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
