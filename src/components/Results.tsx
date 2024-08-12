import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

import { CountryType, useCountriesContext } from '../contexts/CountriesContext';
import Heading from './Heading';
import Pagination from './Pagination';
import CountryItem from './CountryItem';

const sortNames = ['Страна', 'Язык', 'Столица', 'Флаг'];

function sortArrayOfObj(paginatedCountries: CountryType[], sortingDirection: boolean, sortBy: string) {
  let sorted = paginatedCountries;

  // @ts-expect-error THAT'S TOO MUCH
  if (typeof paginatedCountries[0][sortBy] === 'string')
    sorted = paginatedCountries.sort((a, b) => {
      // @ts-expect-error THAT'S TOO MUCH
      if (!a[sortBy] || !b[sortBy]) return -1;
      // @ts-expect-error THAT'S TOO MUCH
      return a[sortBy].localeCompare(b[sortBy]);
    });

  // @ts-expect-error THAT'S TOO MUCH
  if (typeof paginatedCountries[0][sortBy] === 'number')
    sorted = paginatedCountries.sort((a, b) => {
      // @ts-expect-error THAT'S TOO MUCH
      if (!a[sortBy] || !b[sortBy]) return -1;
      // @ts-expect-error THAT'S TOO MUCH
      return a[sortBy] - b[sortBy];
    });

  // @ts-expect-error THAT'S TOO MUCH
  if (typeof paginatedCountries[0][sortBy] === 'object')
    sorted = paginatedCountries.sort((a, b) => {
      // @ts-expect-error THAT'S TOO MUCH
      if (!Object.keys(a[sortBy])[0] || !Object.keys(b[sortBy])[0]) return -1;
      // @ts-expect-error THAT'S TOO MUCH
      return Object.keys(a[sortBy])[0].localeCompare(Object.keys(b[sortBy])[0]);
    });

  return sortingDirection ? sorted : sorted.reverse();
}

export default function Results() {
  const { countries, itemsPerPage, activePage, setItemsPerPage, setActivePage } = useCountriesContext();

  const [activeSorting, setActiveSorting] = useState(sortNames[0]);
  const [sortingDirection, setSortingDirection] = useState(true);

  if (!countries) return;

  const from = (activePage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const paginatedCountries = countries.slice(from, to);

  const sortedCountries = (() => {
    if (activeSorting === sortNames[0]) return sortArrayOfObj(paginatedCountries, sortingDirection, 'name');
    if (activeSorting === sortNames[1])
      return sortArrayOfObj(paginatedCountries, sortingDirection, 'languages');
    if (activeSorting === sortNames[2])
      return sortArrayOfObj(paginatedCountries, sortingDirection, 'capital');
    if (activeSorting === sortNames[3]) return sortArrayOfObj(paginatedCountries, sortingDirection, 'flag');

    return paginatedCountries;
  })();

  return (
    <section className='grid grid-rows-[max-content,max-content] gap-10 p-8 pl-0'>
      <Heading>Список стран</Heading>

      <div className='grid'>
        <div className={`grid grid-cols-4 gap-4 border-b p-2`}>
          {sortNames.map(el => (
            <div
              key={el}
              className='grid cursor-pointer grid-cols-[min-content_1rem] items-center gap-2 overflow-hidden md:grid-cols-[max-content_1rem]'
              onClick={() => {
                if (activeSorting === el) setSortingDirection(dur => !dur);
                else {
                  setActiveSorting(el);
                  setSortingDirection(true);
                }
              }}
            >
              <h2 className='font-bold'>{el}</h2>

              {activeSorting === el && sortingDirection && <FaArrowDown />}
              {activeSorting === el && !sortingDirection && <FaArrowUp />}
            </div>
          ))}
        </div>

        {sortedCountries.map(country =>
          !country ? <p>err</p> : <CountryItem key={country.cca3} country={country} />,
        )}
      </div>

      <div className='flex items-end justify-end gap-x-16 gap-y-8 max800px:flex-col'>
        <div className='flex items-center gap-4'>
          <label htmlFor='rowsPerPage'>Rows per page:</label>
          <select
            className='border p-2 outline-none duration-primary hover:ring hover:ring-blue-300 focus:ring focus:ring-primary'
            name='rowsPerPage'
            defaultValue={itemsPerPage}
            onChange={e => {
              setActivePage(1);
              setItemsPerPage(+e.target.value);
            }}
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map(
              el =>
                el >= 5 && (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ),
            )}
          </select>
        </div>

        <Pagination count={countries.length} />
      </div>
    </section>
  );
}
