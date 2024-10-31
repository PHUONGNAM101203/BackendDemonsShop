// TransactionChart.js
import React, { useContext, useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { OrderContext } from "./index";
import "chart.js/auto";

const TransactionChart = () => {
  const { data } = useContext(OrderContext);
  const { orders } = data;

  const [chartData, setChartData] = useState({});
  const prevOrdersRef = useRef();

  useEffect(() => {
    if (prevOrdersRef.current !== orders && orders && orders.length > 0) {
      prevOrdersRef.current = orders;

      const transactionCounts = {};
      const transactionAmounts = {};

      orders.forEach(order => {
        const { status, amount } = order;
        transactionCounts[status] = (transactionCounts[status] || 0) + 1;
        transactionAmounts[status] = (transactionAmounts[status] || 0) + amount;
      });

      setChartData({
        labels: Object.keys(transactionCounts),
        datasets: [
          {
            label: "Số lượng giao dịch",
            data: Object.values(transactionCounts),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            yAxisID: 'y-axis-count',
          },
          {
            label: "Tổng số tiền (VND)",
            data: Object.values(transactionAmounts),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            yAxisID: 'y-axis-amount',
          },
        ],
      });
    }
  }, [orders]);

  return (
    <div className="bg-white shadow-lg p-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Tổng quan về biểu đồ giao dịch</h2>
      {chartData && chartData.labels ? (
        <div style={{ height: '350px' }}> {/* Tăng chiều cao lên từ 300px thành 350px */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                'y-axis-count': {
                  type: 'linear',
                  position: 'left',
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                  title: {
                    display: true,
                    text: 'Số lượng giao dịch',
                  },
                },
                'y-axis-amount': {
                  type: 'linear',
                  position: 'right',
                  beginAtZero: true,
                  max: 500000,
                  ticks: {
                    callback: function(value) {
                      return '' + value.toLocaleString();
                    },
                  },
                  title: {
                    display: true,
                    text: 'Tổng số tiền ',
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-600">Không có dữ liệu giao dịch</p>
      )}
    </div>
  );
};

export default TransactionChart;
