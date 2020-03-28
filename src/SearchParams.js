import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./userDropdown";
import changeLocation from "./actions/changeLocation";
import changeTheme from "./actions/changeTheme";
// import ThemeContext from "./ThemeContext";

const SearchParams = props => {
  // props added to access the redux state value
  // const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  // const [theme, setTheme] = useContext(ThemeContext);

  // Note: redux state - we can access as props change all location, theme as props.location, props.theme same for setLocation, setTheme

  async function requestPets() {
    const { animals } = await pet.animals({
      location: props.location, // location changed into location: props.location
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedString = breeds.map(({ name }) => name);
      setBreeds(breedString);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            name=""
            id="location"
            value={props.location}
            palaceholder="Location"
            onChange={e => props.setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown></AnimalDropdown>
        <BreedDropdown></BreedDropdown>
        <label htmlFor="color">
          Color
          <select
            name="color"
            value={props.theme}
            onChange={e => props.setTheme(e.target.value)}
            onBlur={e => props.setTheme(e.target.value)}
          >
            <option value="black">Black</option>
            <option value="darkblue">Dark Blue</option>
            <option value="cyan">Cyan</option>
            <option value="peru">Peru</option>
            <option value="darkred">Dark Red</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>submit</button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
};

const mapStateToProps = ({ location, theme }) => {
  return {
    location,
    theme
  };
};

const mapDispatchToProps = dispatch => ({
  setLocation: location => dispatch(changeLocation(location)),
  setTheme: theme => dispatch(changeTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
