import { useLayersSelector } from '../store/layersStore';
import { LayerItem } from './LayerItem';

export function LayerList() {
  const { layerIds } = useLayersSelector((state) => ({ layerIds: state.layerIds }));

  return (
    <div className="layer-list">
      {layerIds.map((id) => (
        <LayerItem key={id} id={id} />
      ))}
    </div>
  );
}
