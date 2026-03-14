'use client';

import { BusinessMode } from '@/types';

const modes: { id: BusinessMode; label: string; icon: string }[] = [
  { id: 'iklan-cod', label: 'Iklan & COD', icon: '📢' },
  { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
  { id: 'ritel-fnb', label: 'Bisnis Ritel / F&B', icon: '🍔' },
  { id: 'manufaktur', label: 'Manufaktur / Pabrik', icon: '🏭' },
  { id: 'produksi-turunan', label: 'Produksi Turunan', icon: '🌴' },
  { id: 'produk-jasa', label: 'Produk Jasa', icon: '💼' },
];

interface Props {
  selectedMode: BusinessMode;
  onSelect: (mode: BusinessMode) => void;
}

export default function BusinessModeSelector({ selectedMode, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelect(mode.id)}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedMode === mode.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-3xl mb-2">{mode.icon}</div>
          <div className="font-medium text-sm">{mode.label}</div>
        </button>
      ))}
    </div>
  );
}
