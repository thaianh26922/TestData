import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Đăng ký các thành phần Chart.js cần thiết
Chart.register(...registerables);

const LineChartPoint = () => {
    // Dữ liệu mẫu cho biểu đồ
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Bảng giá trị theo tháng',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                // Tùy chỉnh điểm
                pointStyle: 'circle', // Kiểu điểm (circle, rect, triangle, etc.)
                pointRadius: 5, // Bán kính của điểm
                pointHoverRadius: 7, // Bán kính của điểm khi hover
                pointBorderColor: 'rgba(75, 192, 192, 1)', // Màu viền của điểm
                pointBackgroundColor: 'rgba(255, 255, 255, 1)', // Màu nền của điểm
                pointBorderWidth: 2, // Độ dày viền của điểm
            },
        ],
    };

    // Tùy chỉnh các thiết lập biểu đồ
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    // Tạo biểu đồ
    useEffect(() => {
        const ctx = document.getElementById('myLineChart');
        // Nếu biểu đồ đã tồn tại, hủy nó
        const chartInstance = Chart.getChart(ctx); // Lấy biểu đồ hiện tại

        if (chartInstance) {
            chartInstance.destroy(); // Hủy biểu đồ
        }

        // Tạo một biểu đồ mới
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
        });

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Hủy biểu đồ khi component bị hủy
            }
        };
    }, []);

    return <canvas id="myLineChart" />;
};

export default LineChartPoint;
