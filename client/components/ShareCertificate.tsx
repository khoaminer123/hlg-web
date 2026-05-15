import React from "react";
import { formatDate, numberToVietnameseWords } from "../utils/formatters";

interface ProfileData {
  fullName?: string;
  dob?: string;
  cccd?: string;
  expiryDate?: string;
  hometown?: string;
  residence?: string;
  gender?: string;
  sharesCount?: number;
  sharesFounder?: number;
  sharesStrategic?: number;
  sharesCommon?: number;
  createdAt?: string;
  _id?: string;
}

interface ShareCertificateProps {
  profile?: ProfileData;
  faceValue?: number;
}

const ShareCertificate: React.FC<ShareCertificateProps> = ({ profile, faceValue: propFaceValue }) => {
  const shares = profile?.sharesCount ?? 0;
  const faceValue = propFaceValue ?? 10000;
  const totalValue = shares * faceValue;
  const totalValueText = numberToVietnameseWords(totalValue);

  // Certificate number based on CCCD
  const certNumber = profile?.cccd
    ? `HLG_${profile.cccd.slice(-3)}/GCNSHCP`
    : "HLG_001/GCNSHCP";

  // Registration date: use createdAt
  const regDate = formatDate(profile?.createdAt);

  // Shareholder registry number
  const regNumber = profile?.cccd
    ? `HLG_${profile.cccd.slice(-3)}`
    : "HLG_001";

  // Issue date from createdAt
  const issueDate = profile?.createdAt
    ? (() => {
      const d = new Date(profile.createdAt);
      return `Hà Nội, ngày ${String(d.getDate()).padStart(2, "0")} tháng ${String(d.getMonth() + 1).padStart(2, "0")} năm ${d.getFullYear()}`;
    })()
    : "Hà Nội, ngày ..... tháng ..... năm .....";

  return (
    <div
      className="bg-white p-12 shadow-lg border max-w-[900px] mx-auto text-[15px] leading-relaxed"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <img src="https://i.ibb.co/5X2V9Lr4/HLG-logo.jpg" className="w-[80px]" alt="Logo HLG" />
        <div className="text-center flex-1">
          <h2 className="text-red-600 font-bold text-xl uppercase">
            CÔNG TY CP CÔNG NGHỆ HLG VIỆT NAM
          </h2>
          <p className="text-blue-700 italic">
            Trụ sở công ty: 208 Vạn Phúc, Hà Đông, Hà Nội
          </p>
        </div>
      </div>

      <div className="border-b border-dotted my-4"></div>

      {/* DOC INFO */}
      <div className="flex justify-between text-[14px] mb-6">
        <p className="text-blue-700">Số: {certNumber}</p>
        <p>{issueDate}</p>
      </div>

      {/* TITLE */}
      <h1 className="text-center text-red-600 text-2xl font-bold mb-6">
        GIẤY CHỨNG NHẬN SỞ HỮU CỔ PHẦN
      </h1>

      {/* COMPANY INFO */}
      <div className="space-y-2 mb-6">
        <p>
          Tên công ty:
          <span className="text-red-600 font-bold ml-2">
            CÔNG TY CP CÔNG NGHỆ HLG VIỆT NAM
          </span>
        </p>
        <p>
          Trụ sở chính:
          <span className="text-blue-700 ml-2">208 Vạn Phúc, Hà Đông, Hà Nội</span>
        </p>
        <p>
          Mã số thuế:
          <span className="text-blue-700 ml-2">2500733665</span>
          {" "}Phòng Đăng ký Kinh doanh - Sở Kế hoạch và Đầu tư Tỉnh Vĩnh Phúc
        </p>
      </div>

      {/* SECTION HEADER */}
      <p className="text-center text-red-600 italic font-semibold mb-4">
        Chứng nhận sở hữu cổ phần của cổ đông như sau:
      </p>

      {/* SHAREHOLDER INFO */}
      <div className="grid grid-cols-2 gap-x-20 mb-6">
        <div className="space-y-2">
          <p>
            Tên cổ đông :
            <span className="text-red-600 font-bold ml-2">
              {profile?.fullName || "........"}
            </span>
          </p>
          <p>Ngày sinh : {formatDate(profile?.dob)}</p>
          <p>CCCD số : {profile?.cccd || "........"}</p>
          <p>Ngày cấp : {formatDate(profile?.expiryDate)}</p>
          <p>Hộ khẩu : {profile?.hometown || "........"}</p>
          <p>Địa chỉ : {profile?.residence || "........"}</p>
        </div>

        <div className="space-y-2">
          <p>Giới tính : {profile?.gender || "........"}</p>
          <p>Quốc tịch : Việt Nam</p>
          <p>
            Nơi cấp : Cục cảnh sát quản lý hành chính về trật tự xã hội
          </p>
        </div>
      </div>

      {/* SHARE DETAILS */}
      <div className="space-y-2 mb-6">
        <p>
          Số lượng cổ phần :
          <span className="text-blue-700 font-semibold ml-1">
            {shares.toLocaleString("vi-VN")}
          </span>{" "}
          cổ phần
        </p>
        <p>
          Mệnh giá :
          <span className="text-blue-700 font-semibold ml-1">
            {faceValue.toLocaleString("vi-VN")}
          </span>{" "}
          đồng/cổ phần
        </p>
        <p>
          Tổng giá trị theo mệnh giá :
          <span className="text-blue-700 font-semibold ml-1">
            {totalValue.toLocaleString("vi-VN")}
          </span>{" "}
          đồng
        </p>
        <p>
          (Bằng chữ:
          <span className="italic text-blue-700 ml-1">{totalValueText}</span>)
        </p>
        <p>Trong đó</p>
        <p>
          + Số lượng cổ phần được tự do chuyển nhượng :
          <span className="text-blue-700 ml-1">
            {(profile?.sharesCommon || 0).toLocaleString("vi-VN")}
          </span>{" "}
          cổ phần
        </p>
        <p>
          + Số lượng cổ phần hạn chế chuyển nhượng :
          <span className="text-blue-700 ml-1">
            {((profile?.sharesFounder || 0) + (profile?.sharesStrategic || 0)).toLocaleString("vi-VN")}
          </span>{" "}
          cổ phần
        </p>
        <p className="italic text-center">
          (Thời hạn tự do chuyển nhượng: 24 tháng kể từ ngày được cấp chứng nhận)
        </p>
        <p>
          Ghi sổ đăng ký cổ đông ngày :
          <span className="text-blue-700 ml-1">{regDate}</span>
          {" "}Số :
          <span className="text-blue-700 ml-1">{regNumber}</span>
        </p>
        <p>Giấy chứng nhận này có hiệu lực kể từ ngày ký.</p>
      </div>

      {/* SIGNATURE SECTION */}
      <div className="flex justify-end mt-5">
        <div className="text-center relative min-h-[200px] min-w-[250px]">
          <p className="font-semibold">TM. BAN LÃNH ĐẠO CÔNG TY</p>
          <p className="font-semibold mt-1 mb-2">Giám Đốc</p>
          <img
            src="https://i.ibb.co/BH90t81j/Hlg.jpg"
            className="absolute left-1/2 -translate-x-1/2 top-[50px] w-[160px] mix-blend-multiply"
            alt="Chữ ký"
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-dotted mt-4 pt-4 text-[13px] text-gray-600">
        <p>Lưu ý: Giấy chứng nhận này có giá trị xác nhận và theo dõi cổ đông.</p>
        <p>Giữ gìn giấy chứng nhận cẩn thận, không làm rách, nhầu nát, hư hỏng.</p>
      </div>
    </div>
  );
};

export default ShareCertificate;