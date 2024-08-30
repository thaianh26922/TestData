import React, { useState, useEffect } from 'react';
import { Select, Card, Table } from 'antd';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils'; // Ensure this function is available

// Sample product data import
import { product } from '../../data/product';
import { order } from '../../data/order';
// Sample orders data import

export default function ManageProduct() {
  const [selectedProduct, setSelectedProduct] = useState(product[0] || {});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [topOrder, setTopOrder] = useState(null);
  const [orderRankings, setOrderRankings] = useState({});
  // Load orders data based on the selected product
  useEffect(() => {
    if (selectedProduct.name) {
      const orders = order.filter(order => order.items.some(item => item.product === selectedProduct.name));
      setFilteredOrders(orders);

      if (orders.length > 0) {
        const orderCounts = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            if (orderCounts[item.product]) {
              orderCounts[item.product] += item.quantity;
            } else {
              orderCounts[item.product] = item.quantity;
            }
          });
        });

        const topOrderProduct = Object.keys(orderCounts).reduce((a, b) => orderCounts[a] > orderCounts[b] ? a : b);
        const topOrderDetails = orders.find(order => order.items.some(item => item.product === topOrderProduct));

        setTopOrder(topOrderDetails);
      } else {
        setTopOrder(null);
      }

      // Calculate order rankings
      const productOrderCounts = {};

      order.forEach(order => {
        order.items.forEach(item => {
          if (productOrderCounts[item.product]) {
            productOrderCounts[item.product] += item.quantity;
          } else {
            productOrderCounts[item.product] = item.quantity;
          }
        });
      });

      // Convert to an array and sort by order count
      const sortedProducts = Object.keys(productOrderCounts).map(productName => ({
        name: productName,
        orders: productOrderCounts[productName],
      })).sort((a, b) => b.orders - a.orders);

      // Map product names to rankings
      const rankings = sortedProducts.reduce((acc, curr, index) => {
        acc[curr.name] = index + 1;
        return acc;
      }, {});

      setOrderRankings(rankings);
    }
  }, [selectedProduct]);

  // Calculate the number of days in stock
  const calculateDaysInStock = (manufactureDate) => {
    const today = new Date();
    const manufactureDateObj = new Date(manufactureDate);
    const differenceInTime = today - manufactureDateObj;
    return Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
  };

  // Get data for the doughnut chart
  const getDoughnutChartData = () => {
    if (!selectedProduct.ingredients) return { labels: [], data: [] };

    const labels = selectedProduct.ingredients.map(ingredient => ingredient.name);
    const data = selectedProduct.ingredients.map(ingredient => ingredient.percentage);

    return { labels, data };
  };

  const { labels, data } = getDoughnutChartData();

  // Columns for the orders table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Dealer Name',
      dataIndex: 'dealer_name',
      key: 'dealer_name',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.product} (Quantity: {item.quantity})</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className='container-website' style={{ padding: '20px' }}>
      {/* Select Product Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Select a Product</h2>
        <Select
          style={{ width: '100%' }}
          value={selectedProduct.name || ''}
          onChange={(value) => {
            const productFind = product.find((prod) => prod.name === value);
            setSelectedProduct(productFind || {});
          }}
        >
          {product.map((product) => (
            <Select.Option key={product.name} value={product.name}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Product Information Card with Doughnut Chart */}
      <Card
        title="Product Information"
        headStyle={{ backgroundColor: '#003366', color: '#ffffff' }} // Blue header background with white text
        style={{ width: '100%' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Product Information */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <p><strong>Name:</strong> {selectedProduct.name || 'N/A'}</p>
            <p><strong>Type:</strong> {selectedProduct.type || 'N/A'}</p>
            <p><strong>Manufacture Date:</strong> {selectedProduct.manufacture_date || 'N/A'}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity_in_stock || 'N/A'}</p>
            <p><strong>Days in Stock:</strong> {calculateDaysInStock(selectedProduct.manufacture_date)}</p>
            <p><strong>Current Stock:</strong> {selectedProduct.stock || 'N/A'}</p>
            <p><strong>Sản phẩm được bán chạy số:</strong> {orderRankings[selectedProduct.name] ? ` ${orderRankings[selectedProduct.name]}` : 'N/A'}</p>

          </div>

          {/* Doughnut Chart */}
          <div style={{ flex: 1 }}>
            {labels.length > 0 && (
              <div style={{ width: '50%', height: '50%' }}>
                <CChart
                  type="doughnut"
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: data,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: getStyle('--cui-body-color'),
                        }
                      }
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <div style={{ marginTop: '20px' }}>
        <h2>Orders for {selectedProduct.name || 'N/A'}</h2>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="order_id"
          pagination={false}
        />
      </div>
    </div>
  );
}
