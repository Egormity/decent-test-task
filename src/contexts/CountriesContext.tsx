import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type CountryType = {
  cca3: string;
  languages: object;
  capital: string;
  flag: string;
  flags: { png: string; svg: string; alt: string };
  name: { common: string };
  car: { side: string };
  timezones: string[];
  region: string;
};

type CountriesContextProps = {
  countries: CountryType[] | null;
  setCountries: (value: CountryType[]) => void;

  activePage: number;
  setActivePage: (value: number) => void;

  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;

  activeCountry: CountryType | null;
  setActiveCountry: (value: CountryType) => CountryType;

  isPending: boolean;
  setIsPending: (value: boolean) => void;
} | null;

const CountriesContext = createContext<CountriesContextProps>(null);

function CountriesContextProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeCountry, setActiveCountry] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    fetch(`https://restcountries.com/v3.1/all`)
      .then(res => res.json())
      .then(data => setCountries(data))
      .then(() => setIsPending(false));
  }, []);

  // console.log(countries);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        // @ts-expect-error dispatch error
        setCountries,
        isPending,
        activeCountry,
        // @ts-expect-error dispatch error
        setActiveCountry,
        activePage,
        setActivePage,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

function useCountriesContext() {
  const context = useContext(CountriesContext);
  if (!context) throw new Error('CountriesContext was used outside of CountriesContextProvider');
  return context;
}

export { CountriesContextProvider, useCountriesContext };
