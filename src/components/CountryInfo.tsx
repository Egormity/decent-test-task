import { useCountriesContext } from '../contexts/CountriesContext';

export default function RepoInfo() {
  const { activeCountry } = useCountriesContext();

  return (
    <section className={`bg-light p-8 min1000px:pl-4`}>
      {!activeCountry ? (
        <div className='flex items-center justify-center'>
          <h5>Выберете страну для детального просмотра</h5>
        </div>
      ) : (
        <div className='grid gap-6'>
          <h1>Страна: {activeCountry.name.common}</h1>
          <h1>Столица: {activeCountry.capital || '-'}</h1>
          <h1>Язык: {activeCountry.languages ? Object.keys(activeCountry.languages).join(', ') : '-'}</h1>
          <h1 className='flex items-center gap-2'>
            Флаг:
            <img
              src={activeCountry.flags.svg || activeCountry.flag}
              alt={activeCountry.name.common + 'flag'}
              className='max-h-5'
            />
          </h1>
          <h1>Сторона вождения: {activeCountry.car.side}</h1>
          <h1>Регион: {activeCountry.region}</h1>
          <h1>Временн(ая/ые) зон(а/ы): {activeCountry.timezones.join(', ')}</h1>
        </div>
      )}
    </section>
  );
}
