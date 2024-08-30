import { Product } from "@/config/types";
import ApprovalForm from "./forms/ApprovalForm";
import ProductForm from "./forms/ProductForm";
// import { getUser } from "@/lib/user";

export default function ProductCard({
  productId,
  role,
}: {
  productId: string;
  role: string;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {role === "admin" ? (
          <ProductForm productId={productId} />
        ) : (
          <ApprovalForm productId={productId} />
        )}
      </div>
    </div>
  );
}
