// ! 45 - child
import styles from './Chart.module.scss'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../card/Card';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {

  const placed = 2
  const processing = 3
  const shipped = 2
  const delivered = 5

  const data = {
   labels: ["Placed orders", "Processing", "Shipped", "Delivered"],
   datasets: [
     {
       label: 'Order count',
       data: [placed, processing, shipped, delivered],
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
     },
   ],
  };

  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
          <h3>Order Status Chart</h3>
          <Bar options={options} data={data} />
      </Card>
    </div>
  )
}

export default Chart