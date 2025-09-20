import { useParams } from 'react-router-dom';
import products from '../data-api/product';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        <img src={product.thumbnail} alt={product.title} className="w-full md:w-1/2 h-96 object-cover rounded-md" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
