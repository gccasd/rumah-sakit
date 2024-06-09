import React from "react";

interface Props {
    data: {
        no_rm: string,
        nama_pasien: string,
        test_lab: string,
        hasil_lab: string
    },
}
const CetakHasilLab = React.forwardRef<HTMLDivElement, Props>(({ data}, ref) => {
    return (
        <div ref={ref} className="p-8 border border-gray-300 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Lab Results</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <span className="text-lg font-semibold">No. Medical Record:</span>
            <span className="ml-2">{data.no_rm}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Nama:</span>
            <span className="ml-2">{data.nama_pasien}</span>
          </div>
          <div className="col-span-2 mb-4">
            <span className="text-lg font-semibold">Test Lab:</span>
            <div dangerouslySetInnerHTML={{ __html: data.test_lab }} />
          </div>
          <div className="col-span-2 mb-4">
            <span className="text-lg font-semibold">Hasil Lab:</span>
            <div dangerouslySetInnerHTML={{ __html: data.hasil_lab }} />
          </div>
    </div>
      </div>
    );
  });

  export default CetakHasilLab;
