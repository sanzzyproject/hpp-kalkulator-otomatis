'use client';

import { useState } from 'react';
import { HasilPerhitungan } from '@/types';

interface Props {
  hasil: HasilPerhitungan;
  batchPerMonth: number;
}

export default function ProfitProjection({ hasil, batchPerMonth }: Props) {
  const [targetLaba, setTargetLaba] = useState<number>(10000000);
  const [hargaJualPilihan, setHargaJualPilihan] = useState<number>(0);

  const totalBiayaProduksiBulanan = hasil.totalBiayaProduksi * batchPerMonth;
  const totalPotensiPenjualanBulanan = hasil.totalPotensiPenjualan * batchPerMonth;
  const labaBulanan = totalPotensiPenjualanBulanan - totalBiayaProduksiBulanan;
  const biayaTetap = 100000; // contoh tetap, bisa diubah nanti

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Target & Proyeksi Penjualan Bulanan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Target Laba Bersih / Bulan</label>
          <input
            type="number"
            value={targetLaba}
            onChange={(e) => setTargetLaba(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga Jual Pilihan (Rp)</label>
          <input
            type="number"
            value={hargaJualPilihan}
            onChange={(e) => setHargaJualPilihan(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm">Potensi Omzet / Bulan</div>
          <div className="text-xl font-bold">Rp {totalPotensiPenjualanBulanan.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm">Total Biaya Produksi / Bulan</div>
          <div className="text-xl font-bold">Rp {totalBiayaProduksiBulanan.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm">Total Biaya Tetap / Bulan</div>
          <div className="text-xl font-bold">Rp {biayaTetap.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm">Proyeksi Laba Bersih / Bulan</div>
          <div className="text-xl font-bold text-green-600">Rp {labaBulanan.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
