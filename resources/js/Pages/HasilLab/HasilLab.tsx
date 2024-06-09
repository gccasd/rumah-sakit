import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NotifSuccess from "@/Components/NotifSuccess";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Pasien } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function HasilLab(
  { auth, pemeriksaan1 }: PageProps,
  className = ''// removed default value assignment for className
) {
  // Initialize data state with default values
  const [data, setData] = useState<Pasien>({
    id: 0,
    no_rm: "",
    nama_pasien: "",
    tanggal_lahir: "",
    jenis_kelamin: "laki-laki",
    status_pasien: "",
    no_bpjs: "",
    alamat: "",
    no_kontak: "",
  });

  useEffect(() => {
    console.log(pemeriksaan1);
    // Update data state with pemeriksaan1.pasien
    setData(pemeriksaan1.pasien || {});
  }, [pemeriksaan1]);

  const noRMInput = useRef<HTMLInputElement>(null);
  const namaPasienInput = useRef<HTMLInputElement>(null);

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
                  hidden={!true}
                  message="Berhasil menambah order pemeriksaan"
                />

                <form onSubmit={() => {}} className="grid grid-cols-2">
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
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
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
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
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
