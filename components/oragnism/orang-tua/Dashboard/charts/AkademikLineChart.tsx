import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Semester 1",
    nilai: 6.9,
  },
  {
    name: "Semester 2",
    nilai: 8.8,
  },
  {
    name: "Semester 1",
    nilai: 7.6,
  },
  {
    name: "Semester 2",
    nilai: 9.8,
  },
];

export default function AkademikLineChart() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={customLegend} />
        <Line
          type="linear"
          dataKey="nilai"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
const customLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 mt-2 justify-center">
      <div className="w-full flex justify-center">
        <span className="text-sm font-semibold">Kelas 7</span>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-sm font-semibold">Kelas 8</span>
      </div>
    </div>
    //   <div display={'flex'} flexWrap={'wrap'} gap={'10px'} sx={{ marginTop: '10px' }} justifyContent={'center'}>
    //     {payload.map((item: any, index: any) => (
    //       <Box display={'flex'} flexDirection={'row'} key={index} gap={'10px'} alignItems={'center'}>
    //         <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
    //         <Typography variant={'caption'} sx={{ color: '#545454' }}>
    //           {item.value}
    //         </Typography>
    //       </Box>
    //     ))}
    //   </div>
  );
};
