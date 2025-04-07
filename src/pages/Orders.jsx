import { useEffect, useState } from "react";
import Layout from "layout/Layout";
import orderService from "services/order.service";
import { useOrders } from "context/OrderContext";
import { formatCurrency } from "helpers/formatCurrency";

const Orders = () => {
  const { orders, setOrders } = useOrders();
  const [currentPage, setCurrentPage] = useState(1); 
  const ordersPerPage = 5;

  useEffect(() => {
    orderService.getOrder().then((res) => setOrders(res.data));
  }, [setOrders]);

  const handleDeleteOrder = (orderId) => {
    console.log("handleDeleteOrder", orderId);
    orderService.removeOrder(orderId).then(() => {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    });
  };

  const handleDeleteOrderGroup = (orderNo) => {
    console.log("handleDeleteOrderGroup", orderNo);
    orderService.removeOrderGroup(orderNo).then(() => {
      setOrders((prevOrders) => prevOrders.filter((order) => order.order_no !== orderNo));
    });
  };

  if (!orders || orders.length === 0) {
    return (
      <Layout loading={orders === null}>
        <h1 className="my-10 text-center text-4xl font-semibold">Orders</h1>
        <p>You are yet to place an order</p>
      </Layout>
    );
  }

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.order_no]) {
      acc[order.order_no] = [];
    }
    acc[order.order_no].push(order);
    return acc;
  }, {});

  const groupedOrdersArray = Object.entries(groupedOrders);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = groupedOrdersArray.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (currentPage < Math.ceil(groupedOrdersArray.length / ordersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const calculateTotalAmount = (orderItems) => {
    return orderItems.reduce((total, order) => total + (order.quantity * order.price), 0);
  };

  return (
    <Layout title="Orders" loading={orders === null}>
      <h1 className="my-10 text-center text-4xl font-semibold">Orders</h1>
      <div className="space-y-8">
        {currentOrders.map(([orderNo, orderItems]) => {
          const totalAmount = calculateTotalAmount(orderItems); // Calculate total amount for the group
          return (
            <div key={orderNo} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
                <span>Order Number: {orderNo}</span>
                <button
                  onClick={() => handleDeleteOrderGroup(orderNo)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete All
                </button>
              </h2>
              <div className="space-y-3">
                {orderItems.map((order) => (
                  <div key={order.id} className="flex items-center border-b pb-2">
                    <img
                      src={order.image_url}
                      alt={order.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{order.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(order.price)}</p>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-lg font-bold">
                Total Amount: {formatCurrency(totalAmount)} {/* Display total amount */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">
          Page {currentPage} of {Math.ceil(groupedOrdersArray.length / ordersPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(groupedOrdersArray.length / ordersPerPage)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default Orders;
