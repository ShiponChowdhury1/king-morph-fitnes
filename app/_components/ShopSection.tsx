import Image from "next/image";

const products = [
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (1).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (2).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (3).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (4).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (5).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (6).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (7).png" },
  { name: "Regular Fit V-Neck", price: "$ 1,290", image: "/images/shop/image-1 (8).png" },
];

export default function ShopSection() {
  return (
    <section className="shop-section" id="shop">
      <div className="shop-header">
        <div className="shop-header-left">
          <h2>Shop MorphFit</h2>
          <p>Premium performance products</p>
        </div>
        <a href="#" className="view-all-btn">
          VIEW ALL
        </a>
      </div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <span className="price">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-footer">
        <a href="#" className="btn-secondary">
          Browse All Products
        </a>
      </div>
    </section>
  );
}
