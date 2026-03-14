import { BahanBaku, BiayaPengolahan, ProdukTurunan, HasilPerhitungan } from '@/types';

export function calculateTotalBiayaBahan(bahanBaku: BahanBaku[]): number {
  return bahanBaku.reduce((sum, b) => sum + b.hargaTotal, 0);
}

export function calculateTotalBiayaPengolahan(biaya: BiayaPengolahan[], batchPerMonth: number): number {
  return biaya.reduce((sum, b) => {
    if (b.periode === 'per_batch') {
      return sum + b.harga;
    } else {
      return sum + (b.harga / batchPerMonth);
    }
  }, 0);
}

export function calculateTotalNilaiJual(produk: ProdukTurunan[]): number {
  return produk.reduce((sum, p) => sum + (p.qty * p.hargaJual), 0);
}

export function calculateHPP(
  bahanBaku: BahanBaku[],
  biayaPengolahan: BiayaPengolahan[],
  produkTurunan: ProdukTurunan[],
  batchPerMonth: number
): HasilPerhitungan {
  const totalBiayaBahan = calculateTotalBiayaBahan(bahanBaku);
  const totalBiayaPengolahan = calculateTotalBiayaPengolahan(biayaPengolahan, batchPerMonth);
  const totalBiayaProduksi = totalBiayaBahan + totalBiayaPengolahan;

  const totalNilaiJual = calculateTotalNilaiJual(produkTurunan);

  const hppPerProduk = produkTurunan.map(p => {
    const proporsi = (p.qty * p.hargaJual) / totalNilaiJual;
    const alokasiBiaya = totalBiayaProduksi * proporsi;
    const hppPerUnit = alokasiBiaya / p.qty;
    return {
      nama: p.nama,
      qty: p.qty,
      alokasiBiaya,
      hppPerUnit,
    };
  });

  const totalPotensiPenjualan = totalNilaiJual;
  const proyeksiLaba = totalPotensiPenjualan - totalBiayaProduksi;

  return {
    totalBiayaProduksi,
    totalPotensiPenjualan,
    proyeksiLaba,
    hppPerProduk,
  };
}
