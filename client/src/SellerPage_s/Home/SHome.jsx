import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './SHome.css';

const OverviewGraph = ({ data, width }) => {
  return (
    <LineChart width={width} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <XAxis dataKey="date" />
      <YAxis />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Total product" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Sale" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Return" stroke="#82ca9d" />
    </LineChart>
  );
};

const SHome = () => {
  // Sample data for the overview graph
  const data = [
    { date: '2024-01-01', "Total product": 100 , "Sale": 200 , Return: 200 },
    { date: '2024-01-02', "Total product": 100 , "Sale": 200 , Return: 250 },
    { date: '2024-01-03', "Total product": 100 , "Sale": 200 , Return: 300 },
    { date: '2024-01-04', "Total product": 100 , "Sale": 200 , Return: 280 },
    { date: '2024-01-05', "Total product": 100 , "Sale": 200 , Return: 320 },
    { date: '2024-01-05', "Total product": 100 , "Sale": 200 , Return: 0   },
    { date: '2024-01-05', "Total product": 100 , "Sale": 200 , Return: 320 },
  ];

  // Hook to get the width of the parent container
  const [parentWidth, setParentWidth] = useState(0);
  const parentRef = useRef(null);
  useEffect(() => {
      const resizeObserver = new ResizeObserver(entries => {
          entries.forEach(entry => {
              setParentWidth(entry.contentRect.width - 50);
            });
        });
        resizeObserver.observe(parentRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
  return (
    <div className="s-home-container" ref={parentRef}>
      <OverviewGraph data={data} width={parentWidth} />
      <div className='Total-data'>
        <div>
          <h4>Total Product's</h4>
          <h3>700</h3>
        </div>
        <div>
          <h4>Total Sale</h4>
          <h3>₹ 70.76L</h3>
        </div>
        <div>
          <h4>Total Return</h4>
          <h3>7.5%</h3>
        </div>
      </div>
    </div>
  );
};

export default SHome;
