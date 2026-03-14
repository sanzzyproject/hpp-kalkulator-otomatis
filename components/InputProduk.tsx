'use client';

import { ProdukTurunan } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  produk: ProdukTurunan[];
  onChange: (produk: ProdukTurunan[]) => void;
}

export default function InputProduk({ produk, onChange }: Props) {
  const addProduk = () => {
    const newProduk: ProdukTurunan = {
      id: uuidv4(),
      nama: '',
      qty: 0,
      satuan: 'kg',
      hargaJual: 0,
    };
    onChange([...produk, newProduk]);
  };

  const updateProduk = (id: string, field: keyof ProdukTurunan, value: any) => {
    const updated = produk.map(p => p.id === id ? { ...p, [field]: value } : p);
    onChange(updated);
  };

  const removeProduk = (id: string) => {
    onChange(produk.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Produk Turunan</h3>
        <button onClick={addProduk} className="text-blue-600 text-sm">+ Tambah</button>
      </div>
      {produk.map((p) => (
        <div key={p.id} className="border p-3 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Nama produk"
            value={p.nama}
            onChange={(e) => updateProduk(p.id, 'nama', e.target.value)}
            className="w-full border rounded p-2"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Qty"
              value={p.qty || ''}
              onChange={(e) => updateProduk(p.id, 'qty', Number(e.target.value))}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Satuan"
              value={p.satuan}
              onChange={(e) => updateProduk(p.id, 'satuan', e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Harga jual"
              value={p.hargaJual || ''}
              onChange={(e) => updateProduk(p.id, 'hargaJual', Number(e.target.value))}
              className="border rounded p-2"
            />
          </div>
          <button onClick={() => removeProduk(p.id)} className="text-red-500 text-sm">Hapus</button>
        </div>
      ))}
    </div>
  );
}
