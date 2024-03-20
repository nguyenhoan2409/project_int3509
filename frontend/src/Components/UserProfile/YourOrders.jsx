import React from 'react'
import './YourOrders.css'

export const YourOrders = () => {

  const data = [
    {
      id: 1123004,
      date: '12-12-2021',
      status: 'Completed',
      total: 1804
      
    },
    {
      id: 96834,
      date: '12-03-2024',
      status: 'Processing',
      total: 1004
      
    },
    {
      id: 109234,
      date: '12-12-2021',
      status: 'Completed',
      total: 1004
      
    },
    
    {
      id: 109234,
      date: '12-12-2021',
      status: 'Processing',
      total: 1004
      
    },

    {
      id: 109234,
      date: '12-12-2021',
      status: 'Processing',
      total: 1004
      
    },

    {
      id: 109234,
      date: '12-12-2021',
      status: 'Completed',
      total: 1004
      
    },
   
  ]
  return (
    <div className="yourorders">
      <h1>Your Order</h1>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>
                  <p>
                    {item.status == 'Completed' && <span className='greendot'></span>}
                    {item.status == 'Processing' && <span className='yellowdot'></span>}
                    {item.status}
                  </p>

                </td>
                <td>{item.total}</td>
                <td>
                  <button className="mainbutton1">View</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}