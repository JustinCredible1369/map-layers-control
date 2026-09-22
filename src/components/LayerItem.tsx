import { ChangeEvent, memo } from 'react';
import { LayerId } from '../types';
import { useLayersDispatch, useLayersSelector } from '../store/layersStore';
import { retryLayer, setLayerOpacity, toggleLayer } from '../store/layerActions';
import { StatusBadge } from './StatusBadge';

interface LayerItemProps {
  id: LayerId;
}

function LayerItemComponent({ id }: LayerItemProps) {
  const dispatch = useLayersDispatch();
  const layer = useLayersSelector((state) => state.layers[id]);

  const handleToggle = () => toggleLayer(dispatch, id);
  const handleRetry = () => retryLayer(dispatch, id);
  const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLayerOpacity(dispatch, id, Number(event.target.value));
  };

  return (
    <div className="layer-item">
      <div className="layer-item__header">
        <label className="layer-item__toggle">
          <input type="checkbox" checked={layer.enabled} onChange={handleToggle} />
          <span>{layer.label}</span>
        </label>
        <StatusBadge status={layer.status} />
      </div>

      <div className="layer-item__opacity">
        <input
          type="range"
          min={0}
          max={100}
          value={layer.opacity}
          onChange={handleOpacityChange}
          disabled={!layer.enabled}
        />
        <span className="layer-item__opacity-value">{layer.opacity}%</span>
      </div>

      {layer.status === 'error' && (
        <div className="layer-item__error">
          <span>{layer.error}</span>
          <button type="button" onClick={handleRetry}>
            Повторить
          </button>
        </div>
      )}
    </div>
  );
}

export const LayerItem = memo(LayerItemComponent);