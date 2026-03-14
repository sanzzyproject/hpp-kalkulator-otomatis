import { ProdukTurunan, HasilPerhitungan } from '@/types';

export function calculateBundling(produkIds: string[], semuaProduk: ProdukTurunan[], hasilHPP: HasilPerhitungan) {
  const produkDalamPaket = semuaProduk.filter(p => produkIds.includes(p.id));
  const totalHPP = produkDalamPaket.reduce((sum, p) => {
    const hpp = hasilHPP.hppPerProduk.find(h => h.nama === p.nama);
    return sum + (hpp ? hpp.hppPerUnit * p.qty : 0);
  }, 0);
  const hargaNormal = produkDalamPaket.reduce((sum, p) => sum + (p.qty * p.hargaJual), 0);

  const hargaHemat = Math.round(hargaNormal * 0.8);
  const hargaSeimbang = Math.round(hargaNormal * 0.875);
  const hargaMaksimal = Math.round(hargaNormal * 0.935);

  return {
    totalHPP,
    hargaNormal,
    hargaHemat,
    hargaSeimbang,
    hargaMaksimal,
  };
}
