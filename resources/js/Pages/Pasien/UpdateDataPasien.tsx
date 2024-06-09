import { useRef, FormEventHandler, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, router, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { PageProps, Pasien } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NotifSuccess from '@/Components/NotifSuccess';
import TextInputSelect from '@/Components/TextInputSelect';

export default function UpdateDataPasien({pasien, auth} : PageProps, {className = ''}) {
    const noRMInput = useRef<HTMLInputElement>(null);
    const namaPasienInput = useRef<HTMLInputElement>(null);
    const tanggalLahirInput = useRef<HTMLInputElement>(null);
    const jenisKelaminInput = useRef<HTMLInputElement>(null);
    const statusPasienInput = useRef<HTMLInputElement>(null);
    const noBpjsInput = useRef<HTMLInputElement>(null);
    const alamatInput = useRef<HTMLInputElement>(null);
    const noKontakInput = useRef<HTMLInputElement>(null);

    const isArray = (data: any) => { if (!Array.isArray(data)) { return data }}

    const { data, setData, post, errors, processing, progress, recentlySuccessful } = useForm({
        _method: '',
        id: '',
        no_rm: '',
        nama_pasien: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        status_pasien: '',
        no_bpjs: '',
        alamat: '',
        no_kontak: '',
    });

    useEffect(() => {
        const getDat: Pasien = isArray(pasien);
        setData({
            _method: 'PUT',
            id: String(getDat.id),
            no_rm: String(getDat.no_rm),
            nama_pasien: getDat.nama_pasien,
            tanggal_lahir: getDat.tanggal_lahir,
            jenis_kelamin: getDat.jenis_kelamin,
            status_pasien: getDat.status_pasien,
            no_bpjs: getDat.no_bpjs,
            alamat: getDat.alamat,
            no_kontak: getDat.no_kontak,
        })

    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        post(route('pasien.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('berhasil')
            },
            onError: (errors) => {
                if (errors.no_rm) {
                    noRMInput.current?.focus();
                }

                if (errors.nama_pasien) {
                    namaPasienInput.current?.focus();
                }

                if (errors.tanggal_lahir) {
                    tanggalLahirInput.current?.focus();
                }

                if (errors.jenis_kelamin) {
                    jenisKelaminInput.current?.focus();
                }

                if (errors.status_pasien) {
                    statusPasienInput.current?.focus();
                }

                if (errors.no_bpjs) {
                    noBpjsInput.current?.focus();
                }

                if (errors.alamat) {
                    alamatInput.current?.focus();
                }

                if (errors.no_kontak) {
                    noKontakInput.current?.focus();
                }

            },
        },);
        e.preventDefault();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
        
        <Head title="Update Pasien" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-meta-4 shadow sm:rounded-lg">
                <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Update Pasien</h2>
            </header>

            <NotifSuccess
                hidden={!recentlySuccessful}
                message='Berhasil merubah data pasien'
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-2">
                <div className="m-3">
                    <InputLabel htmlFor="no_rm" value="No. RM" />
                    <TextInput
                        id="no_rm"
                        ref={noRMInput}
                        value={data.no_rm}
                        onChange={(e) => setData('no_rm', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.no_rm} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="status_pasien" value="Status Pasien" />
                    <TextInput
                        id="status_pasien"
                        ref={statusPasienInput}
                        value={data.status_pasien}
                        onChange={(e) => setData('status_pasien', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.status_pasien} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="nama_pasien" value="Nama Pasien" />
                    <TextInput
                        id="nama_pasien"
                        ref={namaPasienInput}
                        value={data.nama_pasien}
                        onChange={(e) => setData('nama_pasien', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.nama_pasien} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="no_bpjs" value="No. BPJS" />
                    <TextInput
                        id="no_bpjs"
                        ref={noBpjsInput}
                        value={data.no_bpjs}
                        onChange={(e) => setData('no_bpjs', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.no_bpjs} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                    <TextInput
                        id="tanggal_lahir"
                        ref={tanggalLahirInput}
                        value={data.tanggal_lahir}
                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                        type="date"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.tanggal_lahir} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <TextInput
                        id="alamat"
                        ref={alamatInput}
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.alamat} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                    <TextInputSelect
                        id="jenis_kelamin"
                        ref={jenisKelaminInput}
                        value={data.jenis_kelamin}
                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">--</option>
                        <option value="LK">laki-laki</option>
                        <option value="PM">perempuan</option>
                    </TextInputSelect>
                    <InputError message={errors.jenis_kelamin} className="mt-2" />
                </div>
                <div className="m-3">
                    <InputLabel htmlFor="no_kontak" value="No. Kontak" />
                    <TextInput
                        id="no_kontak"
                        ref={noKontakInput}
                        value={data.no_kontak}
                        onChange={(e) => setData('no_kontak', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.no_kontak} className="mt-2" />
                </div>
                <div className="flex items-center gap-4 m-3">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}