import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JenisPemeriksaan, PageProps } from "@/types";
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
import Checkbox from "@/Components/Checkbox";

export default function ListPemeriksaan({
  auth,
  jenisPemeriksaan,
  page,
}: PageProps) {
  const handleClick = (e: number, jenisPemeriksaan: JenisPemeriksaan) => {
    const isActive = jenisPemeriksaan.active;
    const data = jenisPemeriksaan;
    data.active = isActive === "inactive" ? "active" : "inactive";
    router.put("/list-pemeriksaan/" + data.id, data);
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) {

  // }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          List Pemeriksaan
        </h2>
      }
    >
      <Head title="List Pemeriksaan" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="my-8">
            <h2 className="text-2xl text-black dark:text-white">
              PEMERIKSAAN PASIEN
            </h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              List Pemeriksaan
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">
              ORDER PEMERIKSAAN LABORATORIUM{" "}
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
                    name=""
                    id=""
                    className="px-8 mx-3"
                    onChange={() => {}}
                  >
                    <option value="6">6</option>
                  </TextInputSelect>
                  entri
                </p>

                <TextInput
                  disabled={true}
                  type="search"
                  className="bg-transparents absolute right-0 top-0"
                  placeholder="cari data..."
                />
                <div className="grid grid-cols-3 gap-4 mb-5 mt-15">
                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Hematologi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Hematologi" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Kimia Klinik</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Kimia Klinik" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Imunoserologi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Imunoserologi" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Mikrobiologi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Mikrobiologi" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Histologi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Histologi" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col">
                    <table className="table-auto mb-5">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="py-2 px-2">Parasitologi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jenisPemeriksaan.map((value, index) =>
                          value.jenis_pemeriksaan === "Parasitologi" ? (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                                <Checkbox
                                  id={`${value.nama_jenis_pemeriksaan}-${index}-`}
                                  label={value.nama_jenis_pemeriksaan}
                                  onClick={() => handleClick(index, value)}
                                  onChange={() => {}}
                                  checked={
                                    value.active === "active" ? true : false
                                  }
                                />
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
