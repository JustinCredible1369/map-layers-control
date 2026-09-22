import { LayerStatus } from '../types';

const LABELS: Record<LayerStatus, string> = {
  idle: 'Выключен',
  loading: 'Загрузка…',
  success: 'Готово',
  error: 'Ошибка',
};

interface StatusBadgeProps {
  status: LayerStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{LABELS[status]}</span>;
}
