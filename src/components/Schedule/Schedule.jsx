import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const Schedule = () => {
  const data = {
    labels: ['re'],
    datasets: [
      {
        label: 'gogo',
        data: [50, 10, 10, 5, 20, 5],
        backgroundColor: [
          'rgba(112,41,209)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
        borderColor: ['#000'],
      },
    ],
  };

  const options = {
    borderWidth: 10,
    hoverBorderWidth: 0,
    borderRadius: 15,
    cutout: '60%',
    plugins: {
      legend: false,
    },
  };
  return <Doughnut data={data} options={options} />;
};
