const CountryList = ({ countries, onClick }) => {
    const renderCountries = () => {
        if (countries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (countries.length > 0) {
            return countries.map(country => (
            <div key={country.name.common}>
                <div>{country.name.common}
                <button onClick={() => onClick(country)}>Show</button>
                </div>
            </div>
            ))
        } 
    }
    return (
        <div>
            {renderCountries()}
        </div>
    )
}

export default CountryList; 