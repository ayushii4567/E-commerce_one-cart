import { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import Loading from "../component/Loading";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { SiEbox } from "react-icons/si";
import { toast } from "react-toastify";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  // FETCH ALL ORDERS
  const fetchAllOrders = async () => {

    setLoading(true);

    try {

      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );

      if (result.data.success) {

        setOrders([...result.data.orders].reverse());

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed To Fetch Orders");

    } finally {

      setLoading(false);

    }
  };

  // UPDATE STATUS
  const statusHandler = async (e, orderId) => {

    const newStatus = e.target.value;

    // backup old state
    const oldOrders = [...orders];

    // instant UI update
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    try {

      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        {
          orderId,
          status: newStatus,
        },
        { withCredentials: true }
      );

      if (result.data.success) {

        toast.success("Order Status Updated");

      }

    } catch (error) {

      console.log(error);

      // rollback
      setOrders(oldOrders);

      toast.error("Status Update Failed");

    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (

    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

      <Nav />

      <div className="w-full h-full flex items-center lg:justify-start justify-center">

        <Sidebar />

        <div className="lg:w-[85%] md:w-[70%] h-full lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">

          {/* HEADING */}
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px]">
            All Orders List
          </div>

          {/* LOADING */}
          {
            loading ? (

              <div className="w-full h-[60vh] flex items-center justify-center">
                <Loading />
              </div>

            ) : orders.length === 0 ? (

              <div className="text-[25px] text-slate-300">
                No Orders Found
              </div>

            ) : (

              orders.map((order, index) => (

                <div
                  key={index}
                  className="w-[90%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[10px] md:px-[20px] gap-[20px]"
                >

                  {/* ICON */}
                  <div className="flex items-center justify-center">
                    <SiEbox className="w-[60px] h-[60px] text-black p-[5px] rounded-lg bg-white" />
                  </div>

                  {/* ORDER ITEMS */}
                  <div>

                    <div className="flex items-start justify-center flex-col gap-[5px] text-[16px] text-[#56dbfc]">

                      {order.items.map((item, index) => (

                        <p key={index}>
                          {item.name.toUpperCase()} × {item.quantity}
                          <span> ({item.size})</span>
                        </p>

                      ))}

                    </div>

                  </div>

                  {/* ADDRESS */}
                  <div className="text-[15px] text-green-100">

                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>

                    <p>{order.address.street}</p>

                    <p>
                      {order.address.city}, {order.address.state},
                      {order.address.country}, {order.address.pinCode}
                    </p>

                    <p>{order.address.phone}</p>

                  </div>

                  {/* ORDER DETAILS */}
                  <div className="text-[15px] text-green-100">

                    <p>Items : {order.items.length}</p>

                    <p>Method : {order.paymentMethod}</p>

                    <p>
                      Payment : {order.payment ? "Done" : "Pending"}
                    </p>

                    <p>
                      Date : {new Date(order.date).toLocaleDateString()}
                    </p>

                  </div>

                  {/* AMOUNT */}
                  <p className="text-[20px] text-white">
                    ₹ {order.amount}
                  </p>

                  {/* STATUS */}
                  <select
                    value={order.status}
                    className="px-[5px] py-[10px] bg-slate-500 rounded-lg border border-[#96eef3] outline-none"
                    onChange={(e) => statusHandler(e, order._id)}
                  >

                    <option value="Order Placed">
                      Order Placed
                    </option>

                    <option value="Packing">
                      Packing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out for delivery">
                      Out for delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                  </select>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>
  );
}

export default Orders;