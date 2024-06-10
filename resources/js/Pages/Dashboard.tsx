import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { rupiahFormat, toDate } from "@/types/helper";
import ChartOne from "@/Components/Charts/ChartOne";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons/faLocationPin";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons/faStethoscope";

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex flex-col sm:flex-row sm:space-x-10 sm:my-12">
              <div className="xl:w-1/2 mb-4 sm:mb-0">
                <div className="flex-none col-span-12 rounded-sm border border-stroke bg-cyan-600 px-5 pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8 py-5">
                  <p className="text-xl mb-12 text-white">
                    Pemasukan
                  </p>
                  <p className="text-lg font-light mb-2 text-white">
                    {toDate(Date.now())}
                  </p>
                  <p className="text-3xl font-extrabold text-white">
                    {rupiahFormat(70000000)}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl w-full">
                <ChartOne />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-boxdark px-8 py-10 rounded-sm">
                <p className="text-xl text-black mb-4 dark:text-white">
                  Total Pasien  <FontAwesomeIcon icon={faUserGroup} />
                </p>
                <p className="text-5xl my-10 font-bold dark:text-gray-2 text-center text-cyan-600">
                  3.000
                </p>
                <p className="text-lg font-light text-black mt-4 dark:text-white">
                  Up to 6% from last year
                </p>
              </div>
              <div className="bg-white dark:bg-boxdark px-8 py-10 rounded-sm">
                <p className="text-xl text-black mb-4 dark:text-white">
                  Total Pengunjung  <FontAwesomeIcon icon={faLocationPin} />
                </p>
                <p className="text-5xl my-10 font-bold dark:text-gray-2 text-center text-cyan-600">
                  123.456
                </p>
                <p className="text-lg font-light text-black mt-4 dark:text-white">
                  Up to 6% from last year
                </p>{" "}
              </div>
              <div className="bg-white dark:bg-boxdark px-8 py-10 rounded-sm">
                <p className="text-xl text-black mb-4 dark:text-white">
                  Total Pemeriksaan  <FontAwesomeIcon icon={faStethoscope} />
                </p>
                <p className="text-5xl my-10 font-bold dark:text-gray-2 text-center text-cyan-600">
                  3.000
                </p>
                <p className="text-lg font-light text-black mt-4 dark:text-white">
                  Up to 6% from last year
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
