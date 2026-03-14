'use client';

import { useEffect, useState } from 'react';
import { getAllCalculations, deleteCalculation } from '@/lib/db';
import { Calculation } from '@/types';
import * as XLSX from 'xlsx';

export default function HistoryPanel() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getAllCalculations();
    setCalculations(data);
  };

  const handleDelete = async (id: number) => {
    await deleteCalculation(id);
    loadHistory();
  };

  const exportToExcel = () => {
    const wsData = [
      ['ID', 'Nama Bisnis', 'Mode', 'Batch/Bulan', 'Total Biaya', 'Total Penjualan', 'Laba', 'Tanggal'],
      ...calculations.map(c => [
        c.id,
        c.businessName,
        c.businessMode,
        c.batchPerMonth,
        c.hasilPerhitungan.totalBiayaProduksi,
        c.hasilPerhitungan.totalPotensiPenjualan,
        c.hasilPerhitungan.proyeksiLaba,
        new Date(c.createdAt).toLocaleString(),
      ])
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Riwayat');
    XLSX.writeFile(wb, 'riwayat_hpp.xlsx');
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Riwayat Perhitungan</h2>
      <div className="space-y-2 max-h-96 overflow-auto">
        {calculations.map((calc) => (
          <div key={calc.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{calc.businessName}</div>
              <div className="text-sm text-gray-600">{new Date(calc.createdAt).toLocaleString()}</div>
            </div>
            <div className="space-x-2">
              <button className="text-blue-600" onClick={() => { /* muat ulang ke form */ }}>Lihat</button>
              <button className="text-red-600" onClick={() => handleDelete(calc.id!)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={exportToExcel} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Export Excel</button>
    </div>
  );
}
