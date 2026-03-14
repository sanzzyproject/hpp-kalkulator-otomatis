'use client';

import { BiayaPengolahan } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  biaya: BiayaPengolahan[];
  onChange: (biaya: BiayaPengolahan[]) => void;
}

export default function InputBiaya({ biaya, onChange }: Props) {
  const addBiaya = () => {
    const newBiaya: BiayaPengolahan = {
      id: uuidv4(),
      nama: '',
      harga: 0,
      periode: 'per_batch',
    };
    onChange([...biaya, newBiaya]);
  };

  const updateBiaya = (id: string, field: keyof BiayaPengolahan, value: any) => {
    const updated = biaya.map(b => b.id === id ? { ...b, [field]: value } : b);
    onChange(updated);
  };

  const removeBiaya = (id: string) => {
    onChange(biaya.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Biaya Pengolahan</h3>
        <button onClick={addBiaya} className="text-blue-600 text-sm">+ Tambah</button>
      </div>
      {biaya.map((b) => (
        <div key={b.id} className="border p-3 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Nama biaya"
            value={b.nama}
            onChange={(e) => updateBiaya(b.id, 'nama', e.target.value)}
            className="w-full border rounded p-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Harga"
              value={b.harga || ''}
              onChange={(e) => updateBiaya(b.id, 'harga', Number(e.target.value))}
              className="border rounded p-2"
            />
            <select
              value={b.periode}
              onChange={(e) => updateBiaya(b.id, 'periode', e.target.value as 'per_batch' | 'per_bulan')}
              className="border rounded p-2"
            >
              <option value="per_batch">Per Batch</option>
              <option value="per_bulan">Per Bulan</option>
            </select>
          </div>
          <button onClick={() => removeBiaya(b.id)} className="text-red-500 text-sm">Hapus</button>
        </div>
      ))}
    </div>
  );
}
