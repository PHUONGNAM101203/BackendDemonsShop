// TransactionTable.js
import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "./index";

const TransactionTable = () => {
  const { data } = useContext(OrderContext);
  const { orders } = data;

  const [transactionSummary, setTransactionSummary] = useState([]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      // Tổng hợp số lượng và tổng tiền cho mỗi trạng thái
      const summary = orders.reduce((acc, order) => {
        const { status, amount } = order;

        // Tìm trạng thái hiện tại trong mảng
        const existing = acc.find(item => item.status === status);

        if (existing) {
          existing.count += 1;
          existing.totalAmount += amount;
        } else {
          acc.push({ status, count: 1, totalAmount: amount });
        }

        return acc;
      }, []);

      setTransactionSummary(summary);
    }
  }, [orders]);

  return (
    <div className="bg-white shadow-lg p-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tóm tắt giao dịch</h2> {/* Bỏ text-center */}
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-center">Trạng thái</th>
            <th className="px-4 py-2 border border-gray-300 text-center">Số lượng giao dịch</th>
            <th className="px-4 py-2 border border-gray-300 text-center">Tổng số tiền</th>
          </tr>
        </thead>
        <tbody>
          {transactionSummary.length > 0 ? (
            transactionSummary.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-center">{item.status}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{item.count}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{item.totalAmount.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-600">
              Không có dữ liệu giao dịch
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
