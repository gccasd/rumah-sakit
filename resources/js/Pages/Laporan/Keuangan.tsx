import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { rupiahFormat, toDate } from "@/types/helper";
import ChartOne from "@/Components/Charts/ChartOne";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons/faLocationPin";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons/faStethoscope";
import { faMoneyBill1 } from "@fortawesome/free-solid-svg-icons/faMoneyBill1";

export default function Keuangan({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Keuangan" />

      <div className="">
        <div className="mx-auto sm:px-6 lg:px-8 ">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">LAPORAN</h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Keuangan
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">
              KEUANGAN
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 p-4">
                    <h4 className="text-lg text-purple-500"><FontAwesomeIcon icon={faMoneyBill1} /> Pemasukan</h4>
                    <h5>Total penerimaan kas masuk</h5>
                  </div>
                  <div className="bg-gray-300 p-4 flex justify-center items-center">
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      {rupiahFormat(70000000)}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 p-2 rounded-lg flex-grow dark:bg-boxdark bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 p-4">
                    <h4 className="text-lg text-red-500"><FontAwesomeIcon icon={faMoneyBill1} />  Pengeluaran</h4>
                    <h5>Total pengeluaran masuk</h5>
                  </div>
                  <div className="bg-gray-300 p-4 flex justify-center items-center">
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      {rupiahFormat(9000000)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Baris ketiga */}
            <div className="flex w-full space-x-4 mb-5">
              <div className="flex-grow bg-white dark:bg-boxdark px-6 py-6 rounded-sm">
                <p className="text-xl text-black mb-14 dark:text-white">
                  {rupiahFormat(4000000)}
                </p>
                <p className="text-md text-black font-bold dark:text-gray-2 mb-5">
                  Pasien Rawat Jalan
                </p>
                <p className="text-lg text-center font-medium py-2 text-black dark:text-white bg-cyan-300 dark:bg-boxdark-2">
                  MARET 2024
                </p>
              </div>
              <div className="flex-grow bg-white dark:bg-boxdark px-6 py-6 rounded-sm">
                <p className="text-xl text-black mb-14 dark:text-white">
                  {rupiahFormat(1000000)}
                </p>
                <p className="text-md text-black font-bold dark:text-gray-2 mb-5">
                  Pembelian Obat
                </p>
                <p className="text-lg text-center font-medium py-2 text-black dark:text-white bg-cyan-300 dark:bg-boxdark-2">
                  MARET 2024
                </p>
              </div>
              <div className="flex-grow bg-white dark:bg-boxdark px-6 py-6 rounded-sm">
                <p className="text-xl text-black mb-14 dark:text-white">
                  {rupiahFormat(1000000)}
                </p>
                <p className="text-md text-black font-bold dark:text-gray-2 mb-5">
                  Penjualan Obat
                </p>
                <p className="text-lg text-center font-medium py-2 text-black dark:text-white bg-cyan-300 dark:bg-boxdark-2">
                  MARET 2024
                </p>
              </div>
              <div className="flex-grow bg-white dark:bg-boxdark px-6 py-6 rounded-sm">
                <p className="text-xl text-black mb-14 dark:text-white">
                  {rupiahFormat(3000000)}
                </p>
                <p className="text-md text-black font-bold dark:text-gray-2 mb-5">
                  Pasien Rawat Inap
                </p>
                <p className="text-lg text-center font-medium py-2 text-black dark:text-white bg-cyan-300 dark:bg-boxdark-2">
                  MARET 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
