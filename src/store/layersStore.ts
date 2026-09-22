import { createVedro } from 'vedro';
import { LayerConfig, LayerId, LayersState } from '../types';

export const LAYER_CONFIGS: LayerConfig[] = [
  { id: 'temperature', label: 'Температура' },
  { id: 'wind', label: 'Ветер' },
  { id: 'insolation', label: 'Инсоляция' },
];

export function buildInitialLayersState(configs: LayerConfig[]): LayersState {
  const layerIds: LayerId[] = [];
  const layers: LayersState['layers'] = {};

  for (const config of configs) {
    layerIds.push(config.id);
    layers[config.id] = {
      id: config.id,
      label: config.label,
      enabled: false,
      opacity: 100,
      status: 'idle',
      error: null,
      requestId: 0,
    };
  }

  return { layerIds, layers };
}

export const initialLayersState = buildInitialLayersState(LAYER_CONFIGS);

export const {
  Context: LayersContext,
  Provider: LayersProvider,
  useStore: useLayersStore,
  useSelector: useLayersSelector,
  useDispatch: useLayersDispatch,
} = createVedro(initialLayersState);
