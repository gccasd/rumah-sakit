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
import { debounce, isPageNumber } from "@/types/helper";

export default function DaftarPasien({ auth, pasien, page }: PageProps) {
  const [confirmingUserDeletion, setConfirmingDeletion] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const { url } = usePage<any>();

  const [selectedData, setSelectedData] = useState();

  // const data = [
  //     {
  //       no_rm: '3312312',
  //       nama_pasien: 'Lask Kasdc sa',
  //       jenis_kelamin: `LK`,
  //       tanggal_lahir: '1995-05-16',
  //       umur: '22',
  //       alamat: 'Jl. bantul'
  //     },
  //   ];

  useEffect(() => {
    const getIndex = getPageIndex();
    setPageIndex(Number(getIndex));
  }, []);

  const handleSearchQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isPageNumber(url, "/pasien")) {
      const currentUrl = window.location.href;
      const newUrl = currentUrl.split("/").slice(0, -1).join("/");
      window.history.pushState({}, "", newUrl);
    }
    debounceFunction(e.target.value);
  };

  const debounceFunction = debounce((value: string) => {
    router.get(
      "pasien/",
      {
        search: value,
      },
      {
        preserveState: true,
      }
    );
  }, 1100);

  const getPageIndex = () => {
    const path = window.location.pathname;

    // Pisahkan path menjadi array berdasarkan "/"
    const pathParts = path.split("/");

    // Ambil bagian angka dari pathParts
    return pathParts[pathParts.length - 1];
  };

  const confirmUserDeletion = (data: any) => {
    setSelectedData(data);
    setConfirmingDeletion(true);
  };

  const deleteData: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route("pasien.destroy", selectedData), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        alert("Failed delete data");
      },
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingDeletion(false);

    reset();
  };

  const getAge = (date: string): number => {
    const birthdate: Date = new Date(date);
    const today: Date = new Date();

    const ageInMilliseconds: number = today.getTime() - birthdate.getTime();
    const ageInYears: number = Math.floor(
      ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    );

    return ageInYears;
  };
  const [currentPage, setCurrentPage] = useState(1); // Initial page number

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Optionally, you can also update the URL with the new page number
    // by using router.visit or router.replace.
    // router.visit(`/hasil-pemeriksaan?page=${newPage}`);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Daftar Pasien
        </h2>
      }
    >
      <Head title="Daftar Pasien" />
      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">
              MANAJEMEN PASIEN{" "}
            </h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Daftar Pasien
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">DAFTAR PASIEN</h3>
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
                  placeholder="cari data nama..."
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
                        Tanggal Lahir
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Umur
                      </th>
                      <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                        Alamat
                      </th>
                      <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(pasien)
                      ? pasien.map((dataItem, key) => (
                          <tr key={key}>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              {key + 1}.
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark  ">
                              <p className="text-black dark:text-white">
                                {dataItem.no_rm}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.nama_pasien}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.jenis_kelamin}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.tanggal_lahir}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {getAge(dataItem.tanggal_lahir)}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dataItem.alamat}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <div className="flex items-center space-x-3.5">
                                <Link
                                  href={"/pasien/" + dataItem.id + "/edit/"}
                                >
                                  <button className="hover:text-primary">
                                    <FontAwesomeIcon icon={faPencil} />
                                  </button>
                                </Link>
                                <button
                                  className="hover:text-primary"
                                  onClick={() => {
                                    confirmUserDeletion(dataItem);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
                <div className="mb-5">
                  <Pagination
                    totalPage={page}
                    pageNow={currentPage}
                    url={url}
                    onPageChange={handlePageChange}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
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
      </Modal>
    </AuthenticatedLayout>
  );
}
