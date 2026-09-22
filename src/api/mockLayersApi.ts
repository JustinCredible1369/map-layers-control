import { LayerId } from '../types';

export interface LayerDataResponse {
  id: LayerId;
  loadedAt: number;
}

const MIN_DELAY_MS = 500;
const MAX_DELAY_MS = 1500;
const FAILURE_RATE = 0.25;

export function fetchLayerData(id: LayerId): Promise<LayerDataResponse> {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

  return new Promise<LayerDataResponse>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error(`Не удалось загрузить слой "${id}"`));
        return;
      }
      resolve({ id, loadedAt: Date.now() });
    }, delay);
  });
}
