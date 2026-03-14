'use client';

import { useState } from 'react';
import BusinessModeSelector from '@/components/BusinessModeSelector';
import InputBahanBaku from '@/components/InputBahanBaku';
import InputBiaya from '@/components/InputBiaya';
import InputProduk from '@/components/InputProduk';
import HPPResult from '@/components/HPPResult';
import ProfitProjection from '@/components/ProfitProjection';
import ChartProfit from '@/components/ChartProfit';
import BundlingCalculator from '@/components/BundlingCalculator';
import HistoryPanel from '@/components/HistoryPanel';
import { BusinessMode, BahanBaku, BiayaPengolahan, ProdukTurunan, HasilPerhitungan } from '@/types';
import { calculateHPP } from '@/lib/calculations';
import { saveCalculation } from '@/lib/db';

export default function Home() {
  const [businessMode, setBusinessMode] = useState<BusinessMode>('produksi-turunan');
  const [businessName, setBusinessName] = useState('');
  const [batchPerMonth, setBatchPerMonth] = useState(1);
  const [bahanBaku, setBahanBaku] = useState<BahanBaku[]>([]);
  const [biayaPengolahan, setBiayaPengolahan] = useState<BiayaPengolahan[]>([]);
  const [produkTurunan, setProdukTurunan] = useState<ProdukTurunan[]>([]);
  const [hasil, setHasil] = useState<HasilPerhitungan | null>(null);

  const handleHitung = () => {
    if (bahanBaku.length === 0 || produkTurunan.length === 0) {
      alert('Isi minimal satu bahan baku dan satu produk');
      return;
    }
    const result = calculateHPP(bahanBaku, biayaPengolahan, produkTurunan, batchPerMonth);
    setHasil(result);
  };

  const handleSimpan = async () => {
    if (!hasil) return;
    const calculation = {
      businessName,
      businessMode,
      batchPerMonth,
      bahanBaku,
      biayaPengolahan,
      produkTurunan,
      hasilPerhitungan: hasil,
      bundling: [],
    };
    await saveCalculation(calculation);
    alert('Disimpan!');
  };

  return (
    <main className="container mx-auto p-4 max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">Kalkulator HPP Bisnis</h1>

      <BusinessModeSelector selectedMode={businessMode} onSelect={setBusinessMode} />

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">Input Data</h2>
        <div>
          <label className="block text-sm font-medium">Nama Bisnis / Produk Utama</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Jumlah Batch Produksi per Bulan</label>
          <input
            type="number"
            min="1"
            value={batchPerMonth}
            onChange={(e) => setBatchPerMonth(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <InputBahanBaku bahanBaku={bahanBaku} onChange={setBahanBaku} />
        <InputBiaya biaya={biayaPengolahan} onChange={setBiayaPengolahan} />
        <InputProduk produk={produkTurunan} onChange={setProdukTurunan} />

        <button
          onClick={handleHitung}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Hitung HPP
        </button>
      </div>

      {hasil && (
        <>
          <HPPResult hasil={hasil} />
          <ProfitProjection hasil={hasil} batchPerMonth={batchPerMonth} />
          <div className="bg-white p-4 rounded-xl shadow">
            <ChartProfit labaBulanan={hasil.proyeksiLaba * batchPerMonth} />
          </div>
          <BundlingCalculator produk={produkTurunan} hasilHPP={hasil} />
          <button
            onClick={handleSimpan}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            Simpan Perhitungan
          </button>
        </>
      )}

      <HistoryPanel />
    </main>
  );
}
