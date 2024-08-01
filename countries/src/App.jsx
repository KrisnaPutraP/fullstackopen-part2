import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import CountryInformation from './components/CountryInformation';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const hook = () => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => {
        setCountries(res.data);
      });
  }

  useEffect(hook, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleShow = (country) => {
    setSelectedCountry(country);
  }

  useEffect(() => {
    if (search !== '') {
      setFilteredCountries(
        countries.filter(country => 
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  return (
    <div>
      <h1>Country Information</h1>
      <input value={search} onChange={handleSearch} placeholder='Enter country name' />
      <CountryList countries={filteredCountries} onClick={handleShow} />
      {selectedCountry && <CountryInformation countryInformation={selectedCountry} />}
    </div>
  );
}

export default App;
