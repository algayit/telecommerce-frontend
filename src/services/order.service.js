import API from "api/axios.config";

class OrderService {
  async createOrder(userId) {
    return await API.post("/orders/create", { userId});
  }
  getAllOrders(page) {
    return API.get(`/orders/?page=${page}`);
  }
  getOrder() {
    return API.get(`/orders`);
  }

  removeOrder(id) {
    return API.patch(`/orders/order-one/${id}`);
  }

  removeOrderGroup(id) {
    return API.patch(`/orders/order-group/${id}`);
  }
}

export default new OrderService();
