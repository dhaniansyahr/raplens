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

export default function Ipa({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          dataKey="kelas"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="linear" dataKey="siswa" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
