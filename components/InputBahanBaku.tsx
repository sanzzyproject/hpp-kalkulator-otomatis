'use client';

import { BahanBaku } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  bahanBaku: BahanBaku[];
  onChange: (bahanBaku: BahanBaku[]) => void;
}

export default function InputBahanBaku({ bahanBaku, onChange }: Props) {
  const addBahan = () => {
    const newBahan: BahanBaku = {
      id: uuidv4(),
      nama: '',
      hargaTotal: 0,
      jumlah: 0,
      satuan: 'kg',
    };
    onChange([...bahanBaku, newBahan]);
  };

  const updateBahan = (id: string, field: keyof BahanBaku, value: any) => {
    const updated = bahanBaku.map(b => b.id === id ? { ...b, [field]: value } : b);
    onChange(updated);
  };

  const removeBahan = (id: string) => {
    onChange(bahanBaku.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Bahan Baku Utama</h3>
        <button onClick={addBahan} className="text-blue-600 text-sm">+ Tambah</button>
      </div>
      {bahanBaku.map((b) => (
        <div key={b.id} className="border p-3 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Nama bahan"
            value={b.nama}
            onChange={(e) => updateBahan(b.id, 'nama', e.target.value)}
            className="w-full border rounded p-2"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Harga total"
              value={b.hargaTotal || ''}
              onChange={(e) => updateBahan(b.id, 'hargaTotal', Number(e.target.value))}
              className="border rounded p-2 col-span-1"
            />
            <input
              type="number"
              placeholder="Jumlah"
              value={b.jumlah || ''}
              onChange={(e) => updateBahan(b.id, 'jumlah', Number(e.target.value))}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Satuan"
              value={b.satuan}
              onChange={(e) => updateBahan(b.id, 'satuan', e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <button onClick={() => removeBahan(b.id)} className="text-red-500 text-sm">Hapus</button>
        </div>
      ))}
    </div>
  );
}
