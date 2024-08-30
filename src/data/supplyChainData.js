export const supplyChainData = {
    suppliers: [
      {
        supplier_id: "SUP001",
        name: "ABC Sugar Co.",
        contact_info: {
          phone: "+1-123-456-7890",
          email: "contact@abcsugar.com",
          address: "123 Sugar Lane, Sweetville, CA"
        },
        products_supplied: [
          {
            product_id: "ING001",
            product_name: "Sugar",
            quantity_in_stock: 5000,
            unit: "kg",
            price_per_unit: 0.5
          }
        ]
      },
      {
        supplier_id: "SUP002",
        name: "Flour Factory",
        contact_info: {
          phone: "+1-987-654-3210",
          email: "sales@flourfactory.com",
          address: "456 Flour Ave, Bake Town, NY"
        },
        products_supplied: [
          {
            product_id: "ING002",
            product_name: "Flour",
            quantity_in_stock: 8000,
            unit: "kg",
            price_per_unit: 0.3
          }
        ]
      }
    ],
    orders: [
      {
        order_id: "ORD001",
        supplier_id: "SUP001",
        product_id: "ING001",
        order_date: "2024-08-01",
        delivery_date: "2024-08-05",
        quantity: 1000,
        status: "Delivered"
      },
      {
        order_id: "ORD002",
        supplier_id: "SUP002",
        product_id: "ING002",
        order_date: "2024-08-10",
        delivery_date: "2024-08-15",
        quantity: 2000,
        status: "Pending"
      }
    ],
    delivery_schedule: [
      {
        order_id: "ORD001",
        delivery_date: "2024-08-05",
        delivery_status: "Delivered"
      },
      {
        order_id: "ORD002",
        delivery_date: "2024-08-15",
        delivery_status: "Pending"
      }
    ]
  };
  