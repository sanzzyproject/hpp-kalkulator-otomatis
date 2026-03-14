'use client';

import { HasilPerhitungan } from '@/types';

interface Props {
  hasil: HasilPerhitungan;
}

export default function HPPResult({ hasil }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Hasil Perhitungan per Batch</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Total Biaya Produksi</div>
          <div className="text-lg font-semibold">Rp {hasil.totalBiayaProduksi.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Total Potensi Penjualan</div>
          <div className="text-lg font-semibold">Rp {hasil.totalPotensiPenjualan.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Proyeksi Laba / (Rugi)</div>
          <div className={`text-lg font-semibold ${hasil.proyeksiLaba >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Rp {hasil.proyeksiLaba.toLocaleString()}
          </div>
        </div>
      </div>

      <h3 className="font-semibold mt-4">Detail HPP per Produk</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Produk</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Alokasi Biaya</th>
              <th className="px-4 py-2 text-left">HPP per Unit</th>
            </tr>
          </thead>
          <tbody>
            {hasil.hppPerProduk.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.qty}</td>
                <td className="px-4 py-2">Rp {item.alokasiBiaya.toLocaleString()}</td>
                <td className="px-4 py-2">Rp {item.hppPerUnit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
