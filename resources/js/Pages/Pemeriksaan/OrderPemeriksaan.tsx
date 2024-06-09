import {
  useRef,
  FormEventHandler,
  useEffect,
  ChangeEvent,
  useState,
} from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { PageProps, Pasien } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NotifSuccess from "@/Components/NotifSuccess";
import TextInputSelect from "@/Components/TextInputSelect";
import { debounce } from "@/types/helper";

export default function OrderPemeriksaan(
  { auth, pasien, jenisPemeriksaan }: PageProps,
  { className = "" }
) {
  const [dataPasien, setDataPasien] = useState<Pasien>();
  const [isListHidden, setIsListHidden] = useState<boolean>(true);

  const noRMInput = useRef<HTMLInputElement>(null);
  const dokterPenanggungJawabInput = useRef<HTMLInputElement>(null);
  const jaminanInput = useRef<HTMLInputElement>(null);
  const namaPemeriksaanInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, post, processing, recentlySuccessful } =
    useForm({
      no_rm: "",
      jaminan: "",
      nama_pemeriksaan: "",
      dokter_penanggung_jawab: "",
    });

  const debounceFunction = debounce((value: string) => {
    router.get(
      "order-pemeriksaan",
      {
        no_rm: value,
      },
      {
        preserveState: true,
      }
    );
  }, 1100);

  const handleSearchQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsListHidden(false);
    e.preventDefault();
    debounceFunction(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route("order-pemeriksaan"), {
      preserveScroll: true,
      onSuccess: () => {},
      onError: (errors) => {
        if (errors.no_rm) {
          noRMInput.current?.focus();
        }
        if (errors.dokter_penanggung_jawab) {
          dokterPenanggungJawabInput.current?.focus();
        }

        if (errors.jaminan) {
          jaminanInput.current?.focus();
        }

        if (errors.nama_pemeriksaan) {
          namaPemeriksaanInput.current?.focus();
        }
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Order Pemeriksaan" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">
              PEMERIKSAAN PASIEN
            </h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Order Pemeriksaan
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">
              ORDER PEMERIKSAAN LABORATORIUM{" "}
            </h3>
          </div>
          <div className="mx-auto bg-cyan-600 px-4 py-4 ">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <section className={className}>

                <NotifSuccess
                  hidden={!recentlySuccessful}
                  message="Berhasil menambah order pemeriksaan"
                />

                <form onSubmit={handleSubmit}>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="no_rm" value="Cari No. RM" />
                    <TextInput
                      className="mt-1 block w-full bg-white"
                      onChange={handleSearchQuery}
                      type="search"
                      placeholder="Masukan No. RM untuk mencari data pasien...."
                    />
                    <ul>
                      {Array.isArray(pasien)
                        ? pasien.map((result) => (
                            <li
                              key={result.id}
                              hidden={isListHidden}
                              onClick={() => {
                                setDataPasien(result);
                                setIsListHidden(true);
                                setData("no_rm", String(result.no_rm));
                              }}
                              className="cursor-pointer px-2 py-2 bg-slate-50"
                            >
                              {result.no_rm}
                            </li>
                          ))
                        : ""}
                    </ul>
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="no_rm" value="No. RM" />
                    <TextInput
                      disabled={true}
                      id="no_rm"
                      value={dataPasien?.no_rm}
                      onChange={(e) => setData("no_rm", e.target.value)}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                    <InputError message={errors.no_rm} className="mt-2" />
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="nama_pasien" value="Nama Pasien" />
                    <TextInput
                      disabled={true}
                      id="nama_pasien"
                      value={dataPasien?.nama_pasien}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                    <TextInput
                      disabled={true}
                      id="tanggal_lahir"
                      value={dataPasien?.tanggal_lahir}
                      type="date"
                      className="mt-1 block w-full bg-white"
                    />
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="alamat" value="Alamat" />
                    <TextInput
                      disabled={true}
                      id="alamat"
                      value={dataPasien?.alamat}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                    <TextInputSelect
                      disabled={true}
                      id="jenis_kelamin"
                      value={dataPasien?.jenis_kelamin}
                      className="mt-1 block w-full bg-white"
                    >
                      <option value="">--</option>
                      <option value="LK">laki-laki</option>
                      <option value="PM">perempuan</option>
                    </TextInputSelect>
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="no_kontak" value="No. Kontak" />
                    <TextInput
                      disabled={true}
                      id="no_kontak"
                      value={dataPasien?.no_kontak}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                  </div>
                  <div className="m-3">
                    <InputLabel
                      className="text-black dark:text-white"
                      htmlFor="nama_pemeriksaan"
                      value="Nama Pemeriksaan"
                    />
                    <TextInput
                      id="nama_pemeriksaan"
                      ref={dokterPenanggungJawabInput}
                      value={data?.nama_pemeriksaan}
                      onChange={(e) =>
                        setData("nama_pemeriksaan", e.target.value)
                      }
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                    <InputError
                      message={errors.nama_pemeriksaan}
                      className="mt-2"
                    />
                  </div>
                  <div className="m-3">
                    <InputLabel
                      className="text-black dark:text-white"
                      htmlFor="jenis_pemeriksaan"
                      value="Jenis Pemeriksaan Yang Diinput"
                    />
                    <ul
                      id="jenis_pemeriksaan"
                      className="text-black dark:text-white"
                    >
                      {jenisPemeriksaan.map((value) => (
                        <li key={value.id}>
                          {" "}
                          - {value.nama_jenis_pemeriksaan}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="m-3">
                    <InputLabel className="text-black" htmlFor="jaminan" value="Jaminan" />
                    <TextInput
                      id="jaminan"
                      ref={jaminanInput}
                      value={data?.jaminan}
                      onChange={(e) => setData("jaminan", e.target.value)}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                    <InputError message={errors.jaminan} className="mt-2" />
                  </div>
                  <div className="m-3">
                    <InputLabel
                      className="text-black dark:text-white"
                      htmlFor="dokter_penanggung_jawab"
                      value="Dokter Penanggung Jawab"
                    />
                    <TextInput
                      id="dokter_penanggung_jawab"
                      ref={dokterPenanggungJawabInput}
                      value={data?.dokter_penanggung_jawab}
                      onChange={(e) =>
                        setData("dokter_penanggung_jawab", e.target.value)
                      }
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                    <InputError
                      message={errors.dokter_penanggung_jawab}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center gap-4 m-3">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
