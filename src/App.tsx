import Layout from './components/Layout';
import { CountriesContextProvider } from './contexts/CountriesContext';

export default function App() {
  return (
    <CountriesContextProvider>
      <Layout />
    </CountriesContextProvider>
  );
}
