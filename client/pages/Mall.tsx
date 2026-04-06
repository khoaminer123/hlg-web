
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const Mall: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Ấm đun nước siêu tốc QC-SS02 gấp gọn (Đơn vị: Cái) Trắng",
      description: "Inox 304 thực phẩm, hai lớp chống bỏng, 600W đun sôi nhanh, yên tâm uống nước.",
      price: "105.50",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Nồi sữa đáy phẳng Inox ASD 16cm (Đơn vị: Cái) Bạc",
      description: "Inox không gỉ, đáy composite ba lớp, nồi sữa 16cm thiết kế đa năng, bền bỉ.",
      price: "79.90",
      image: "https://images.unsplash.com/photo-1584990333910-fe907cdd4655?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Chảo chống dính Debo DEP-836 32cm (Đơn vị: Cái) Đen",
      description: "Vật liệu tiếp xúc thực phẩm không dính, dẫn nhiệt nhanh đồng đều, chảo xào Debo cao cấp.",
      price: "117.90",
      image: "https://images.unsplash.com/photo-1584946395311-66512351c070?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Bình nước giữ nhiệt NONOO 400ml (Đơn vị: Cái) Trắng",
      description: "Kiểu dáng nhỏ gọn dễ thương, dung tích 400ml, giữ nhiệt lâu dài.",
      price: "39.90",
      image: "https://images.unsplash.com/photo-1602143394807-a25831f295ed?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Bàn chải điện Midea S1Px (Đơn vị: Bộ) Trắng",
      description: "Nhiều chế độ làm sạch, lông bàn chải mềm bảo vệ nướu, chống nước IPX7.",
      price: "129.00",
      image: "https://images.unsplash.com/photo-1559592481-7410fd2f520b?q=80&w=2127&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Sữa tươi nguyên chất 200ml/12 hộp (Thùng)",
      description: "Sữa tươi sạch giàu canxi, hương vị thơm ngon tự nhiên từ nông trại.",
      price: "44.00",
      image: "https://images.unsplash.com/photo-1550583724-125581f77033?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Khăn tắm cao cấp dòng thanh xuân (1 chiếc) A-1160 Tím",
      description: "Thấm hút cực tốt, nhanh khô, thiết kế dành riêng cho giới trẻ.",
      price: "36.00",
      image: "https://images.unsplash.com/photo-1583947581924-860bda3a3036?q=80&w=2068&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Túi xách công sở OIWAS OCG3111 (Đơn vị: Cái) Xám",
      description: "Phong cách thời trang bền bỉ, có thể treo trên vali, phù hợp đi làm và đi du lịch.",
      price: "59.90",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#fbfbfb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Title */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Sản phẩm</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-50"
            >
              {/* Image Container */}
              <div className="aspect-square w-full mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Info */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-[15px] font-bold text-gray-800 leading-snug line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="mt-auto pt-6 flex justify-end">
                  <div className="text-[#142077] font-bold">
                    <span className="text-xs mr-1">₫</span>
                    <span className="text-lg">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mall;
