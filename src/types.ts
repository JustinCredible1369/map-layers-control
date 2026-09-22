export type LayerId = string;

export type LayerStatus = 'idle' | 'loading' | 'success' | 'error';

export interface LayerConfig {
  id: LayerId;
  label: string;
}

export interface LayerState {
  id: LayerId;
  label: string;
  enabled: boolean;
  opacity: number;
  status: LayerStatus;
  error: string | null;
  requestId: number;
}

export interface LayersState {
  layerIds: LayerId[];
  layers: Record<LayerId, LayerState>;
}