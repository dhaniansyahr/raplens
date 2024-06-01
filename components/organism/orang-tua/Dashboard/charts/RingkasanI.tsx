import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "0",
    nilai: 0,
  },
  {
    name: "1",
    nilai: 60,
  },
  {
    name: "2",
    nilai: 35,
  },
  {
    name: "3",
    nilai: 40,
  },
  {
    name: "4",
    nilai: 79,
  },
];

export default function RingkasanI() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={customLegend} />
        <Area type="monotone" dataKey="nilai" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const customLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center">
      <span className="text-xl font-semibold">Rahmatul Idami</span>
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
