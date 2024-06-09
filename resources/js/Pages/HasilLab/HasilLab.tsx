import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NotifSuccess from "@/Components/NotifSuccess";
import CetakHasilLab from "@/Components/Print/CetakHasilLab";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Pasien, Pemeriksaan } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { useReactToPrint } from "react-to-print";

export default function HasilLab(
  { auth, pemeriksaan }: PageProps,
  className = "" // removed default value assignment for className
) {
  const [html, setHtml] = useState("");
  const [html1, setHtml1] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      return new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve;
        console.log(resolve);
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const noRMInput = useRef<HTMLInputElement>(null);
  const namaPasienInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, post, reset, processing, recentlySuccessful } =
    useForm<Pemeriksaan>();

  useEffect(() => {
    setData(pemeriksaan[0]);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  function onChange1(e: ContentEditableEvent) {
    setHtml1(e.target.value);
  }

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
            <h2 className="text-2xl text-black dark:text-white">Hasil Lab</h2>
            <h3 className="text-xl font-light text-black dark:text-white">
              Hasil Lab
            </h3>
          </div>
          <div className="bg-cyan-800 px-4 py-4">
            <h3 className="text-2xl font-medium text-white">Hasil Lab</h3>
          </div>
          <div className="mx-auto bg-cyan-600 px-4 py-4 ">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <section className={className}>
                <form onSubmit={() => {}} className="" >
                  <div className="m-3">
                    <InputLabel
                      className="text-black dark:text-white"
                      htmlFor="no_rm"
                      value="No. RM"
                    />
                    <TextInput
                      id="no_rm"
                      ref={noRMInput}
                      type="text"
                      className="mt-1 block w-full bg-white"
                      //   value={data?.pasien.no_rm ? data.pasien.no_rm : ""}
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
                      //   value={data?.pasien.nama_pasien ? data.pasien.nama_pasien : ""}
                      onChange={() => {}}
                      type="text"
                      className="mt-1 block w-full bg-white"
                    />
                    <div className="mt-8 w-full ">
                      <InputLabel
                        className="text-black dark:text-white"
                        htmlFor="nama_pasien"
                        value="Test Laboratorium"
                      />
                      <div className="bg-white">
                        <EditorProvider>
                          <Editor
                            value={html}
                            onChange={onChange}
                            className="bg-white w-full"
                          >
                            <Toolbar>
                              <BtnBold />
                              <BtnItalic />
                              <BtnUnderline />
                              <BtnNumberedList />
                              <BtnBulletList />
                              <BtnUndo />
                              <BtnRedo />
                              <BtnLink />
                              <BtnStyles />
                              <BtnClearFormatting />
                              <BtnStrikeThrough />
                            </Toolbar>
                          </Editor>
                        </EditorProvider>
                      </div>
                    </div>
                    <div className="mt-8 w-full ">
                      <InputLabel
                        className="text-black dark:text-white"
                        htmlFor="nama_pasien"
                        value="Hasil Laboratorium"
                      />
                      <div className="bg-white">
                        <EditorProvider>
                          <Editor
                            value={html1}
                            onChange={onChange1}
                            className="bg-white w-full"
                          >
                            <Toolbar>
                              <BtnBold />
                              <BtnItalic />
                              <BtnUnderline />
                              <BtnNumberedList />
                              <BtnBulletList />
                              <BtnUndo />
                              <BtnRedo />
                              <BtnLink />
                              <BtnStyles />
                              <BtnClearFormatting />
                              <BtnStrikeThrough />
                            </Toolbar>
                          </Editor>
                        </EditorProvider>
                      </div>
                    </div>{" "}
                    <div
                      className="mt-5 bg-green-800 px-5 py-2 w-20 rounded-lg text-white"
                      onClick={handlePrint}
                    >
                      Print
                    </div>
                    <div
                      style={{
                        display: isPrinting ? "block" : "none",
                      }}
                      className="absolute top-0 left-0 z-0"
                    >
                      <CetakHasilLab
                        ref={printRef}
                        data={{
                          nama_pasien: "nama",
                          no_rm: "RM002",
                          test_lab: html,
                          hasil_lab: html1,
                        }}
                      />
                    </div>
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
