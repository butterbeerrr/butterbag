function ProductCard({ product, brand }) {
  return (
    <div className="group">
      <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          {brand}
        </p>

        <h3 className="mt-1 text-sm text-neutral-800">
          {product.name}
        </h3>

        <p className="mt-2 text-sm font-medium">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;