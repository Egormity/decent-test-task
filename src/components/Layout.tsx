import { useCountriesContext } from '../contexts/CountriesContext';
import Heading from './Heading';

import CountryInfo from './CountryInfo';
import Results from './Results';
import Spinner from './Spinner';

const mainClassName = 'flex h-screen p-8 items-center justify-center';

export default function Layout() {
  const { countries, isPending } = useCountriesContext();

  function whatToShow() {
    if (isPending)
      return (
        <main className={mainClassName}>
          <Spinner />
        </main>
      );

    if (!countries || !countries.length)
      return (
        <main className={mainClassName}>
          <Heading>Ошибочка..</Heading>
        </main>
      );

    return (
      <main className='padding-primary-l grid min-h-screen grid-cols-[2fr_1fr] max1000px:grid-cols-1'>
        <Results />
        <CountryInfo />
      </main>
    );
  }

  return <>{whatToShow()}</>;
}
