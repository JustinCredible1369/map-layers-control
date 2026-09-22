import { LayersProvider } from './store/layersStore';
import { LayerList } from './components/LayerList';
import './styles.css';

export default function App() {
  return (
    <LayersProvider>
      <div className="app">
        <h1>Управление картографическими слоями</h1>
        <LayerList />
      </div>
    </LayersProvider>
  );
}