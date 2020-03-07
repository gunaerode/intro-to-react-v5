import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import userDropdown from "./userDropdown";
import useDropdown from "./userDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">
          Location
          <input
            type="text"
            name=""
            id="location"
            value={location}
            palaceholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown></AnimalDropdown>
        <BreedDropdown></BreedDropdown>
        <button>submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
