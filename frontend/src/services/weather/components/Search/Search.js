import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/OpenWeatherService';
import { useTripContext } from '../../../../hooks/useTripContext'

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);
  const { tripData } = useTripContext();
  const lat = tripData.destinations[0].position.lat
  const lon = tripData.destinations[0].position.lon

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);
    setSearchValue(tripData.destinations[0].position)

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
