import React from "react";
import { useAuth } from "../context/AuthContext";

const ShareCertificate: React.FC = () => {

  const { user } = useAuth();

  const shares = user?.shares ?? 1000;

  return (

    <div
      className="bg-white p-12 shadow-lg border max-w-[900px] mx-auto text-[15px] leading-relaxed"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >

      {/* HEADER */}

      <div className="flex items-center gap-4">

        <img
          src="/logo.png"
          className="w-[80px]"
        />

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

        <p className="text-blue-700">
          Số: EX12652/GCNSHCP
        </p>

        <p>
          Hà Nội, ngày 08 tháng 10 năm 2026
        </p>

      </div>


      {/* TITLE */}

      <h1 className="text-center text-red-600 text-2xl font-bold mb-6">
        GIẤY CHỨNG NHẬN SỞ HỮU CỔ PHẦN
      </h1>


      {/* COMPANY */}

      <div className="space-y-2 mb-6">

        <p>
          Tên công ty:
          <span className="text-red-600 font-bold ml-2">
            CÔNG TY CP CÔNG NGHỆ HLG VIỆT NAM
          </span>
        </p>

        <p>
          Trụ sở chính:
          <span className="text-blue-700 ml-2">
            208 Vạn Phúc, Hà Đông, Hà Nội
          </span>
        </p>

        <p>
          Mã số thuế:
          <span className="text-blue-700 ml-2">
            2500733665
          </span>
          {" "} Phòng Đăng ký Kinh doanh - Sở Kế hoạch và Đầu tư Tỉnh Vĩnh Phúc cấp
        </p>

      </div>


      {/* SECTION */}

      <p className="text-center text-red-600 italic font-semibold mb-4">
        Chứng nhận sở hữu cổ phần của cổ đông như sau:
      </p>


      {/* SHAREHOLDER */}

      <div className="grid grid-cols-2 gap-x-20 mb-6">

        <div className="space-y-2">

          <p>
            Tên cổ đông :
            <span className="text-red-600 font-bold ml-2">
              {user?.name ?? "TRẦN THỊ DUY LY"}
            </span>
          </p>

          <p>Ngày sinh : 26/02/1977</p>

          <p>CCCD số : 068177004304</p>

          <p>Ngày cấp : 25/01/2024</p>

          <p>
            Hộ khẩu : 1011/1 Trần Phú, Phường BLao,
            Thành phố Bảo Lộc, Tỉnh Lâm Đồng
          </p>

          <p>
            Địa chỉ : 1011/1 Trần Phú, Phường BLao,
            Thành phố Bảo Lộc, Tỉnh Lâm Đồng
          </p>

        </div>


        <div className="space-y-2">

          <p>Giới tính : Nữ</p>

          <p>Quốc tịch : Việt Nam</p>

          <p>
            Nơi cấp :
            Cục cảnh sát quản lý hành chính về trật tự xã hội
          </p>

        </div>

      </div>


      {/* SHARE INFO */}

      <div className="space-y-2 mb-6">

        <p>
          Số lượng cổ phần :
          <span className="text-blue-700 font-semibold ml-1">
            {shares.toLocaleString()}
          </span> cổ phần
        </p>

        <p>
          Mệnh giá :
          <span className="text-blue-700 font-semibold ml-1">
            10 000
          </span> đồng/cổ phần
        </p>

        <p>
          Tổng giá trị theo mệnh giá :
          <span className="text-blue-700 font-semibold ml-1">
            {(shares * 10000).toLocaleString()}
          </span> đồng
        </p>

        <p>
          (Bằng chữ:
          <span className="italic text-blue-700 ml-1">
            mười triệu
          </span>)
        </p>

        <p>Trong đó</p>

        <p>
          + Số lượng cổ phần được tự do chuyển nhượng :
          ................ cổ phần
        </p>

        <p>
          + Số lượng cổ phần hạn chế chuyển nhượng :
          <span className="text-blue-700 ml-1">
            {shares.toLocaleString()}
          </span> cổ phần
        </p>

        <p className="italic text-center">
          (Thời hạn tự do chuyển nhượng: 24 tháng kể từ ngày được cấp chứng nhận)
        </p>

        <p>
          Ghi sổ đăng ký cổ đông ngày :
          <span className="text-blue-700 ml-1">08/10/2024</span>
          {" "}Số :
          <span className="text-blue-700 ml-1">EX12652</span>
        </p>

        <p>
          Giấy chứng nhận này có hiệu lực kể từ ngày ký.
        </p>

      </div>


      {/* SIGNATURE */}

      <div className="flex justify-end mt-10">

        <div className="text-center relative">

          <p className="font-semibold">
            TM. BAN LÃNH ĐẠO CÔNG TY
          </p>

          <p>Giám Đốc</p>

          {/* <img
            src="/stamp.png"
            className="absolute left-[-40px] top-[10px] w-[130px]"
          /> */}

          <img
            src="https://i.ibb.co/8LMg0g2D/image-2026-03-26-160455066.png"
            className="absolute left-[40px] top-[50px] w-[120px]"
          />

          <p className="mt-20 font-semibold">
            LÝ THỊ VÂN
          </p>

        </div>

      </div>


      {/* FOOTER */}

      <div className="border-t border-dotted mt-12 pt-4 text-[13px] text-gray-600">

        <p>
          Lưu ý: Giấy chứng nhận này có giá trị xác nhận và theo dõi cổ đông.
        </p>

        <p>
          Giữ gìn giấy chứng nhận cẩn thận, không làm rách, nhầu nát, hư hỏng.
        </p>

      </div>

    </div>

  );

};

export default ShareCertificate;