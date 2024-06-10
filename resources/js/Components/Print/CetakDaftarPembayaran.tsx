import React, { MutableRefObject, RefObject } from 'react';
import { Pemeriksaan } from "@/types";
import { rupiahFormat } from '@/types/helper';

interface Props {
    data: Pemeriksaan,
    className?: string,
}

const CetakDaftarPembayaran = React.forwardRef<HTMLDivElement, Props>(({ data, className = ''}, ref) => {
  return (
    <div ref={ref}>
      <div
        className={"w-210mm min-h-297mm p-20 mx-auto " + className}
      >
        <div className="mb-40">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-10">Ringkasan Pembayaran</h2>
            <p className="text-sm mb-20">Tanggal: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="border border-solid border-black p-10 mb-20">
            <div className="flex justify-between mb-5">
              <span className="font-bold">Nomor RM:</span>
              <span>{data.no_rm}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="font-bold">Nama Pasien:</span>
              <span>{data.pasien.nama_pasien}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="font-bold">Asuransi:</span>
              <span>{data.jaminan || '-'}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="font-bold">Dokter Penanggung Jawab:</span>
              <span>{data.dokter_penanggung_jawab}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="font-bold">Total Pembayaran:</span>
              <span>{rupiahFormat(data.total_pembayaran) || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Metode Pembayaran:</span>
              <span>{data.metode_pembayaran || '-'}</span>
            </div>
          </div>
          <p className="text-center text-lg">Terima kasih atas kunjungan Anda!</p>
        </div>
      </div>
    </div>
  );
});

export default CetakDaftarPembayaran;
