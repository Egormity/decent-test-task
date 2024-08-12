type ResultsGridProps = {
  name: string;
  flag: { svg: string };
  languages: object;
  capital: string;
  className?: string;
  onClick?: () => void;
};

export default function ResultsGrid({
  name,
  languages,
  flag,
  capital,
  className,
  onClick,
}: ResultsGridProps) {
  return (
    <div className={`${className} grid grid-cols-4 items-center gap-4 border-b p-2`} onClick={onClick}>
      <h3 className='overflow-hidden'>{name}</h3>
      <h3 className='overflow-hidden'>{languages ? Object.keys(languages)[0] : '-'}</h3>
      <h3 className='overflow-hidden'>{capital || '-'}</h3>
      <h3 className='flex items-center gap-2'>
        <img src={flag?.svg || ''} alt={name + 'flag'} className='max-h-5' />
      </h3>
    </div>
  );
}
