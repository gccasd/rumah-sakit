import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageProps } from "@/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  ChangeEvent,
  EventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import TextInputSelect from "@/Components/TextInputSelect";
import { Pagination } from "@/Components/Pagination";
import { debounce, isPageNumber, toDate } from "@/types/helper";

export default function DaftarPasien({ auth, pemeriksaan, page }: PageProps) {
  const { url } = usePage<any>();

  const handleSearchQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isPageNumber(url, "/pengambilan-sample")) {
      const currentUrl = window.location.href;
      const newUrl = currentUrl.split("/").slice(0, -1).join("/");
      window.history.pushState({}, "", newUrl);
    }
    debounceFunction(e.target.value);
  };

  const debounceFunction = debounce((value: string) => {
    router.get(
      "pengambilan-sample/",
      {
        search: value,
      },
      {
        preserveState: true,
      }
    );
  }, 1100);

  const [currentPage, setCurrentPage] = useState(1); // Initial page number

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Pengambilan Sample
        </h2>
      }
    >
      <Head title="Pengambilan Sampel" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
        <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">PENGAMBILAN SAMPEL</h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Pengambilan Sampel
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">
            PENGAMBILAN SAMPEL
            </h3>
          </div>
          <div className="mx-auto bg-cyan-600 px-4 py-4 ">
            {/* Tabel */}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div
                className="w-full overflow-x-auto relative"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <p className="mt-4">
                  Tampilkan
                  <TextInputSelect
                    value="15"
                    className="px-8 mx-3"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </TextInputSelect>
                  entri
                </p>

                <TextInput
                  onChange={handleSearchQuery}
                  type="search"
                  className="bg-transparents absolute right-0 top-0"
                  placeholder="cari data..."
                />

                <table className="w-full table-auto mt-10 mb-10">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        No.
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        No. RM
                      </th>
                      <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                        Nama Pasien
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Jenis Kelamin
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Tanggal
                      </th>
                      <th
                        className="py-4 px-4 font-medium text-black dark:text-white"
                        colSpan={5}
                      >
                        Jenis Sample
                      </th>
                      <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    </tr>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4">
                        EDTA
                      </th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4">
                        Serum
                      </th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4">
                        Citrate
                      </th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4">
                        Urin
                      </th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4">
                        Lainnya
                      </th>
                      <th className="p-0 dark:text-white text-black font-medium text-sm py-4 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(pemeriksaan)
                      ? pemeriksaan.map((dataItem, key) => (
                          <tr key={key}>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {key + 1}.
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark  ">
                              <p className="text-black dark:text-white">
                                {dataItem.pasien.no_rm}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.pasien.nama_pasien}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.pasien.jenis_kelamin}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {toDate(dataItem.updated_at).toString()}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {dataItem.edta === "no" ? (
                                <div className="inline-flex items-center justify-center rounded-full bg-red-500 text-white px-2.5 py-1">
                                  X
                                </div>
                              ) : (
                                <div className="bg-purple-500 text-black px-2 py-0.5 rounded-full">
                                  EDTA
                                </div>
                              )}
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {dataItem.serum === "no" ? (
                                <div className="inline-flex items-center justify-center rounded-full bg-red-500 text-white px-2.5 py-1">
                                  X
                                </div>
                              ) : (
                                <div className="bg-green-500 text-black px-2 py-0.5 rounded-full">
                                  Serum
                                </div>
                              )}
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {dataItem.citrate === "no" ? (
                                <div className="inline-flex items-center justify-center rounded-full bg-red-500 text-white px-2.5 py-1">
                                  X
                                </div>
                              ) : (
                                <div className="bg-pink-500 text-black px-2 py-0.5 rounded-full">
                                  Citrate
                                </div>
                              )}
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {dataItem.urin === "no" ? (
                                <div className="inline-flex items-center justify-center rounded-full bg-red-500 text-white px-2.5 py-1">
                                  X
                                </div>
                              ) : (
                                <div className="bg-yellow-500 text-black px-2 py-0.5 rounded-full">
                                  Serum
                                </div>
                              )}
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {dataItem.lainnya === "no" ? (
                                <div className="inline-flex items-center justify-center rounded-full bg-red-500 text-white px-2.5 py-1">
                                  X
                                </div>
                              ) : (
                                <div className="bg-fuchsia-400 text-black px-2 py-0.5 rounded-full">
                                  Lainnya
                                </div>
                              )}
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <div className="flex flex-wrap flex-col items-center space-y-2">
                                <button className="bg-green-400 text-black w-26">
                                  Edit
                                </button>
                                <button className="bg-red-400 text-black w-26">
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
                <div className="mb-5">
                <Pagination   totalPage={page}
  pageNow={currentPage}
  url={url}
  onPageChange={handlePageChange}/>                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth='md'>
                <form onSubmit={deleteData} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 pb-9 dark:text-white">
                        Anda yakin akan menghapus data ?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Data
                        </DangerButton>
                    </div>
                </form>
            </Modal> */}
    </AuthenticatedLayout>
  );
}
