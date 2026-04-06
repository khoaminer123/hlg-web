import React from "react";
import { useAuth } from "../context/AuthContext";
import ShareCertificate from "./ShareCertificate";

const ShareholderDashboard: React.FC = () => {

  const { user } = useAuth();

  const shares = user?.shares ?? 0;
  const percent = user?.percent ?? 0;

  const shareList = [
    {
      name: "Cổ phần sáng lập trung tâm vận hành",
      percent: percent,
      shares: shares
    },
    {
      name: "Cổ phần cổ đông chiến lược",
      percent: 0.005,
      shares: 500
    },
    {
      name: "Cổ phần phổ thông",
      percent: 0.002,
      shares: 200
    }
  ];

  return (

    <div className="max-w-6xl mx-auto py-16 px-6 pt-[150px]">

      <h1 className="text-3xl font-bold mb-12 text-[#142077]">
        Trung tâm vận hành cổ phần
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-14">

        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Tổng cổ phần sở hữu</p>
          <h2 className="text-3xl font-bold text-[#142077]">
            {shares.toLocaleString()}
          </h2>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Tỷ lệ sở hữu</p>
          <h2 className="text-3xl font-bold text-[#142077]">
            {percent} %
          </h2>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Tổng giá trị cổ phần</p>
          <h2 className="text-3xl font-bold text-[#142077]">
            {(shares * 10000).toLocaleString()} VNĐ
          </h2>
        </div>

      </div>

      <div className="bg-white shadow-lg rounded-xl border mb-14">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-[#142077]">
            Danh sách cổ phần sở hữu
          </h2>
        </div>

        <div className="divide-y">

          {shareList.map((share, index) => (

            <div
              key={index}
              className="p-6 flex items-center justify-between hover:bg-gray-50"
            >

              <div>

                <p className="font-semibold text-gray-800">
                  {share.name}
                </p>

                <p className="text-sm text-gray-500">
                  Số cổ phần: {share.shares.toLocaleString()}
                </p>

              </div>

              <div className="text-right">

                <p className="text-lg font-bold text-[#142077]">
                  {share.percent} %
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ShareCertificate />

    </div>

  );

};

export default ShareholderDashboard;