import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ChartThree from "@/Components/Charts/ChartThree";
import ChartTwo from "@/Components/Charts/ChartTwo";

export default function RawatJalan({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Jumlah Pasien
        </h2>
      }
    >
      <Head title="Jumlah Pasien" />

      <div className="">
        <div className="mx-auto sm:px-6 lg:px-8 ">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">LAPORAN</h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Jumlah Pasien
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">
              JUMLAH PASIEN
            </h3>
          </div>
          <div className="mx-auto bg-cyan-600 px-4 py-4 ">
            {/* Baris pertama */}
            <div className="flex w-full mb-30">
              <div className="bg-gray-200 flex-grow">
                <div className="flex items-center">
                  <div className="rounded-full bg-white px-5 py-2 dark:bg-boxdark">
                    <h4 className="inline text-black dark:text-white">
                      Select Period
                    </h4>
                    <select
                      name="se"
                      id="select"
                      className="rounded-full outline-none ml-2"
                    >
                      <option value="march">
                        <p className="text-black dark:text-white">
                          from March, 2024
                        </p>
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Baris kedua */}
            <div className="flex w-ful space-x-16 mb-20">
              <div className="bg-gray-200 p-2 rounded-lg flex-grow dark:bg-boxdark bg-white">
              <ChartThree />

              </div>
              <div className="bg-gray-200 p-2 rounded-lg flex-grow dark:bg-boxdark bg-white">
              <ChartTwo />

              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
