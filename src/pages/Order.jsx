import OrderConfirm from "components/OrderConfirm";
import Layout from "layout/Layout";

const Order = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-10">
        <OrderConfirm />
      </div>
    </Layout>
  );
};

export default Order;
