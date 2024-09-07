import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import QRCode from "react-qr-code";

const ViewQrCode = () => {
  const [qrData, setQrData] = useState(null);
  const [_qrCode, set_qrCode] = useState({});

  useEffect(() => {
    setQrData(JSON.parse(localStorage.getItem("qrcode")));
  }, []);

  useEffect(() => {
    if (qrData) {
      set_qrCode({
        ...qrData,
      });
    }
  }, [qrData]);

  const handlePrint = () => {
    const printContents =
      document.getElementById("qr-code-container").innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code</title>
          <style>
            @media print {
              body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              #qr-code-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div id="qr-code-container">
            ${printContents}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <TitleCard title={"View Qr Code"} topMargin="mt-2">
        <div className="mt-8">
          <h2 className="text-center text-xl font-bold">QR Code</h2>
          <div id="qr-code-container" className="flex justify-center mt-4">
            {_qrCode ? (
              <QRCode value={JSON.stringify(_qrCode)} size={250} />
            ) : (
              <div className="text-gray-600 text-[25px]">No QR Code Found!</div>
            )}
          </div>
          {_qrCode && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Print QR Code
              </button>
            </div>
          )}
        </div>
      </TitleCard>
    </>
  );
};

export default ViewQrCode;
