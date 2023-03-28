import { ModalMessage } from './components/ModalMessage';
import Wallets from './components/Wallets';

function App() {
  return (
    <div className='container'>
      <ModalMessage />
      <header>
        <h1 className="text-center">Wallets Analytics</h1>
      </header>
      <main className='pt-2'>
        <Wallets/>
      </main>
    </div>
  );
}

export default App;