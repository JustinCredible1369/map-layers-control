import { fetchLayerData } from '../api/mockLayersApi';
import { LayerId } from '../types';
import { useLayersDispatch } from './layersStore';

type LayersDispatch = ReturnType<typeof useLayersDispatch>;

function runLayerRequest(dispatch: LayersDispatch, id: LayerId, requestId: number): void {
  fetchLayerData(id)
    .then(() => {
      dispatch((state) => {
        const layer = state.layers[id];
        if (!layer || layer.requestId !== requestId) {
          return {};
        }
        return {
          layers: {
            ...state.layers,
            [id]: { ...layer, status: 'success' as const, error: null },
          },
        };
      });
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      dispatch((state) => {
        const layer = state.layers[id];
        if (!layer || layer.requestId !== requestId) {
          return {};
        }
        return {
          layers: {
            ...state.layers,
            [id]: { ...layer, status: 'error' as const, error: message },
          },
        };
      });
    });
}

export function toggleLayer(dispatch: LayersDispatch, id: LayerId): void {
  dispatch((state) => {
    const layer = state.layers[id];
    if (!layer) return {};

    const enabled = !layer.enabled;

    if (!enabled) {
      return {
        layers: {
          ...state.layers,
          [id]: { ...layer, enabled: false, status: 'idle' as const, error: null },
        },
      };
    }

    const requestId = layer.requestId + 1;
    runLayerRequest(dispatch, id, requestId);

    return {
      layers: {
        ...state.layers,
        [id]: { ...layer, enabled: true, status: 'loading' as const, error: null, requestId },
      },
    };
  });
}

export function retryLayer(dispatch: LayersDispatch, id: LayerId): void {
  dispatch((state) => {
    const layer = state.layers[id];
    if (!layer) return {};

    const requestId = layer.requestId + 1;
    runLayerRequest(dispatch, id, requestId);

    return {
      layers: {
        ...state.layers,
        [id]: { ...layer, status: 'loading' as const, error: null, requestId },
      },
    };
  });
}

export function setLayerOpacity(dispatch: LayersDispatch, id: LayerId, opacity: number): void {
  dispatch((state) => {
    const layer = state.layers[id];
    if (!layer) return {};

    return {
      layers: {
        ...state.layers,
        [id]: { ...layer, opacity },
      },
    };
  });
}