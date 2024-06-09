import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import TextInputSelect from "@/Components/TextInputSelect";
import NotifSuccess from "@/Components/NotifSuccess";

export default function InputDataPasien(
  {
    auth,
    mustVerifyEmail,
    status,
  }: PageProps<{ mustVerifyEmail: boolean; status?: string }>,
  { className = "" }
) {
  const noRMInput = useRef<HTMLInputElement>(null);
  const namaPasienInput = useRef<HTMLInputElement>(null);
  const tanggalLahirInput = useRef<HTMLInputElement>(null);
  const jenisKelaminInput = useRef<HTMLInputElement>(null);
  const statusPasienInput = useRef<HTMLInputElement>(null);
  const noBpjsInput = useRef<HTMLInputElement>(null);
  const alamatInput = useRef<HTMLInputElement>(null);
  const noKontakInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, post, reset, processing, recentlySuccessful } =
    useForm({
      no_rm: "",
      nama_pasien: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      no_bpjs: "",
      alamat: "",
      no_kontak: "",
    });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("pasien.store"), {
      preserveScroll: true,
      onSuccess: () => reset(),
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
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">
              MANAJEMEN PASIEN
            </h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Input Data Pasien
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">TAMBAH PASIEN</h3>
          </div>
          <div className="mx-auto bg-cyan-600 px-4 py-4 ">
            <section className={className}>
              <NotifSuccess
                hidden={!recentlySuccessful}
                message="Berhasil menambah data pasien"
              />

              <form onSubmit={handleSubmit} className="grid grid-cols-2">
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="no_rm"
                    value="No. RM"
                  />
                  <TextInput
                    id="no_rm"
                    ref={noRMInput}
                    value={data.no_rm}
                    onChange={(e) => setData("no_rm", e.target.value)}
                    type="text"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.no_rm} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="nama_pasien"
                    value="Nama Pasien"
                  />
                  <TextInput
                    id="nama_pasien"
                    ref={namaPasienInput}
                    value={data.nama_pasien}
                    onChange={(e) => setData("nama_pasien", e.target.value)}
                    type="text"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.nama_pasien} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="no_bpjs"
                    value="No. BPJS"
                  />
                  <TextInput
                    id="no_bpjs"
                    ref={noBpjsInput}
                    value={data.no_bpjs}
                    onChange={(e) => setData("no_bpjs", e.target.value)}
                    type="text"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.no_bpjs} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="tanggal_lahir"
                    value="Tanggal Lahir"
                  />
                  <TextInput
                    id="tanggal_lahir"
                    ref={tanggalLahirInput}
                    value={data.tanggal_lahir}
                    onChange={(e) => setData("tanggal_lahir", e.target.value)}
                    type="date"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.tanggal_lahir} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="alamat"
                    value="Alamat"
                  />
                  <TextInput
                    id="alamat"
                    ref={alamatInput}
                    value={data.alamat}
                    onChange={(e) => setData("alamat", e.target.value)}
                    type="text"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.alamat} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="jenis_kelamin"
                    value="Jenis Kelamin"
                  />
                  <TextInputSelect
                    id="jenis_kelamin"
                    ref={jenisKelaminInput}
                    value={data.jenis_kelamin}
                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                    className="mt-1 block w-full bg-white"
                  >
                    <option value="">--</option>
                    <option value="LK">laki-laki</option>
                    <option value="PM">perempuan</option>
                  </TextInputSelect>
                  <InputError message={errors.jenis_kelamin} className="mt-2" />
                </div>
                <div className="m-3">
                  <InputLabel
                    className="text-black dark:text-white"
                    htmlFor="no_kontak"
                    value="No. Kontak"
                  />
                  <TextInput
                    id="no_kontak"
                    ref={noKontakInput}
                    value={data.no_kontak}
                    onChange={(e) => setData("no_kontak", e.target.value)}
                    type="text"
                    className="mt-1 block w-full bg-white"
                  />
                  <InputError message={errors.no_kontak} className="mt-2" />
                </div>
                <div className="m-3"></div>
                <div className="flex items-center gap-4 m-3">
                  <PrimaryButton disabled={processing}>Save</PrimaryButton>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Saved.
                    </p>
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
