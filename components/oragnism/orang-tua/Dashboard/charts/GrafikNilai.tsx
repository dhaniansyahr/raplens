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

export default function GrafikNilai() {
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
        <Area type="monotone" dataKey="nilai" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
