
import { useState } from "react";
import OrderService from "services/order.service";
import OrderSummary from "./OrderSummary";
import { Button } from "@windmill/react-ui";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

const OrderConfirm = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (redirectToReferrer) {
      return <Navigate to={"/orders"} />;
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await OrderService.createOrder();  
      toast.success("Your order has been successfully confirmed! ✅");

      setTimeout(() => {
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-3xl font-semibold text-center mb-3">Order Summary</h1>
      <OrderSummary />
      <div className="flex justify-between">
        <Button tag={Link} to="/cart" layout="outline" size="small">
          Back to cart
        </Button>
        <Button onClick={() => handleSubmit()} type="submit" size="small">
          {isLoading ? <PulseLoader color={"#0a138b"} size={10} loading /> : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirm;
