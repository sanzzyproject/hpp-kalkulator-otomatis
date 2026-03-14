'use client';

import { ProdukTurunan, HasilPerhitungan } from '@/types';
import { useState } from 'react';
import { calculateBundling } from '@/lib/bundling';

interface Props {
  produk: ProdukTurunan[];
  hasilHPP: HasilPerhitungan;
}

export default function BundlingCalculator({ produk, hasilHPP }: Props) {
  const [selectedProduk, setSelectedProduk] = useState<string[]>([]);
  const [bundlingResult, setBundlingResult] = useState<any>(null);

  const toggleProduk = (id: string) => {
    setSelectedProduk(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const hitungBundling = () => {
    if (selectedProduk.length < 2) return;
    const result = calculateBundling(selectedProduk, produk, hasilHPP);
    setBundlingResult(result);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Buat Harga Bundling Cerdas</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Pilih produk untuk paket bundling (minimal 2):</p>
        <div className="grid grid-cols-2 gap-2">
          {produk.map(p => (
            <label key={p.id} className="flex items-center space-x-2 border p-2 rounded">
              <input
                type="checkbox"
                checked={selectedProduk.includes(p.id)}
                onChange={() => toggleProduk(p.id)}
              />
              <span>{p.nama} (Rp {p.hargaJual})</span>
            </label>
          ))}
        </div>
        <button
          onClick={hitungBundling}
          disabled={selectedProduk.length < 2}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Hitung Bundling
        </button>
      </div>

      {bundlingResult && (
        <div className="mt-4 space-y-3">
          <div className="border p-3 rounded">
            <div className="flex justify-between">
              <span>Total HPP Gabungan:</span>
              <span className="font-semibold">Rp {bundlingResult.totalHPP.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Harga Jual Normal:</span>
              <span className="font-semibold">Rp {bundlingResult.hargaNormal.toLocaleString()}</span>
            </div>
          </div>

          <h3 className="font-semibold">Saran Harga Bundling</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-green-200 p-3 rounded bg-green-50">
              <div className="font-bold text-lg">Paket Hemat</div>
              <div className="text-2xl font-bold">Rp {bundlingResult.hargaHemat.toLocaleString()}</div>
              <div className="text-sm line-through">Rp {bundlingResult.hargaNormal.toLocaleString()}</div>
              <div className="text-sm">Diskon: Rp {(bundlingResult.hargaNormal - bundlingResult.hargaHemat).toLocaleString()}</div>
              <div className="text-sm">Profit: Rp {(bundlingResult.hargaHemat - bundlingResult.totalHPP).toLocaleString()}</div>
              <div className="text-sm">Margin: {(((bundlingResult.hargaHemat - bundlingResult.totalHPP) / bundlingResult.hargaHemat) * 100).toFixed(1)}%</div>
            </div>
            <div className="border border-blue-200 p-3 rounded bg-blue-50">
              <div className="font-bold text-lg">Paling Seimbang</div>
              <div className="text-2xl font-bold">Rp {bundlingResult.hargaSeimbang.toLocaleString()}</div>
              <div className="text-sm line-through">Rp {bundlingResult.hargaNormal.toLocaleString()}</div>
              <div className="text-sm">Diskon: Rp {(bundlingResult.hargaNormal - bundlingResult.hargaSeimbang).toLocaleString()}</div>
              <div className="text-sm">Profit: Rp {(bundlingResult.hargaSeimbang - bundlingResult.totalHPP).toLocaleString()}</div>
              <div className="text-sm">Margin: {(((bundlingResult.hargaSeimbang - bundlingResult.totalHPP) / bundlingResult.hargaSeimbang) * 100).toFixed(1)}%</div>
            </div>
            <div className="border border-purple-200 p-3 rounded bg-purple-50">
              <div className="font-bold text-lg">Profit Maksimal</div>
              <div className="text-2xl font-bold">Rp {bundlingResult.hargaMaksimal.toLocaleString()}</div>
              <div className="text-sm line-through">Rp {bundlingResult.hargaNormal.toLocaleString()}</div>
              <div className="text-sm">Diskon: Rp {(bundlingResult.hargaNormal - bundlingResult.hargaMaksimal).toLocaleString()}</div>
              <div className="text-sm">Profit: Rp {(bundlingResult.hargaMaksimal - bundlingResult.totalHPP).toLocaleString()}</div>
              <div className="text-sm">Margin: {(((bundlingResult.hargaMaksimal - bundlingResult.totalHPP) / bundlingResult.hargaMaksimal) * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
