import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const Schedule = () => {
  const data = {
    labels: ['Early investors','Liquidity','Community&Ecosystem','Adv&Team','Marketing/Treasury','Staking&Liquidity rewards','Public'],
    datasets: [
      {
        label: '',
        data: [5, 7, 12, 12, 15, 19,30],
        backgroundColor: [
          'rgba(255,86,201)',
          'rgba(255, 100, 86)',
          'rgba(255, 206, 86)',
          'rgba(0, 199, 99)',
          'rgba(230, 126, 16)',
          'rgba(54, 162, 235)',
          'rgba(112,41,209)',
          
        ],
        borderColor: ['#000'],
      },
    ],
  };

  const options = {
    borderWidth: 10,
    hoverBorderWidth: 0,
    borderRadius: 10,
    cutout: '60%',
    plugins: {
      legend: false,
    },
  };
  return <Doughnut data={data} options={options} />;
};
