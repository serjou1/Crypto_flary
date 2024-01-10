import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const Schedule = () => {
  // const data = {
  //   labels: ['Fair Launch', ' Private Round', 'Airdrop', 'Liquidity', 'Ecosystem', 'Team'],
  //   datasets: [
  //     {
  //       label: 'Fair Launch',
  //       data: [50],
  //       backgroundColor: ['rgba(112,41,209)'],
  //       borderColor: ['#000'],
  //       circumference: (50 / 50) * 360,
  //     },
  //     {
  //       label: 'Fair Launch',
  //       data: [20],
  //       backgroundColor: ['rgba(153, 102, 255)'],
  //       borderColor: ['#000'],
  //       circumference: (20 / 50) * 360,
  //     },
  //     {
  //       label: 'Fair Launch',
  //       data: [10],
  //       backgroundColor: ['rgba(54, 162, 235)'],
  //       borderColor: ['#000'],
  //       circumference: (10 / 50) * 360,
  //     },
  //     {
  //       label: 'Fair Launch',
  //       data: [10],
  //       backgroundColor: ['rgba(255, 206, 86)'],
  //       borderColor: ['#000'],
  //       circumference: (10 / 50) * 360,
  //     },
  //     {
  //       label: 'Fair Launch',
  //       data: [5],
  //       backgroundColor: ['rgba(255, 159, 64)'],
  //       borderColor: ['#000'],
  //       circumference: (5 / 50) * 360,
  //     },
  //     {
  //       label: 'Fair Launch',
  //       data: [5],
  //       backgroundColor: ['rgba(75, 192, 192)'],
  //       borderColor: ['#000'],
  //       circumference: (5 / 50) * 360,
  //     },
  //   ],
  // };
    const data = {
      labels: ['re'],
      datasets: [
        {
          label: 'gogo',
          data: [50, 10,10, 5, 20, 5],
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
    borderWidth: 15,
    hoverBorderWidth: 0,
    borderRadius: 30,
    cutout: '60%',
    plugins: {
      legend: false,
    },
  };
  return <Doughnut data={data} options={options} />;
};
