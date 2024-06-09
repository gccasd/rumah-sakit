import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Pasien {
    id: number;
    no_rm: string;
    nama_pasien: string;
    tanggal_lahir: string;
    jenis_kelamin: 'laki-laki' | 'perempuan';
    status_pasien: string;
    no_bpjs: string;
    alamat: string;
    no_kontak: string;
}

interface JenisPemeriksaan {
    [x: string]: any;
    id: number;
    nama_jenis_pemeriksaan: string;
    jenis_pemeriksaan: 'Hematologi' | 'Kimia Klinik' | 'Imunoserologi' | 'Parasitologi' | 'Mikrobiologi' | 'Histologi';
    active: 'active' | 'inactive';
    created_at: Date;
    updated_at: Date;
}

interface Pemeriksaan {
    id: number;
    noRm: string;
    jaminan: string | null;
    dokter_penanggungJawab: string;
    status_pemeriksaan: string | null;
    total_pembayaran: number | null;
    metode_pembayaran: 'debit' | 'cash' | null;
    jenis_pemeriksaan: string | null;
    status_pembayaran: 'proses' | 'diterima' | null;
    pasien: Pasien;
    updated_at: number;
    edta: 'yes' | 'no';
    serum: 'yes' | 'no';
    citrate: 'yes' | 'no';
    urin: 'yes' | 'no';
    lainnya: 'yes' | 'no';
  }

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    pasien: Pasien | Pasien[];
    jenisPemeriksaan: JenisPemeriksaan[];
    pemeriksaan: Pemeriksaan[];
    ziggy: Config & { location: string };
};
