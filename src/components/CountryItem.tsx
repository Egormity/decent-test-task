import { CountryType, useCountriesContext } from '../contexts/CountriesContext';
import ResultsGrid from './ResultsGrid';

export default function Repo({ country }: { country: CountryType }) {
  const { setActiveCountry } = useCountriesContext();

  if (!country) return <p>No country could be found..</p>;

  return (
    <ResultsGrid
      name={country.name.common}
      languages={country.languages}
      flag={country.flags}
      capital={country.capital}
      className='cursor-pointer duration-primary hover:bg-zinc-200'
      onClick={() => setActiveCountry(country)}
    />
  );
}
