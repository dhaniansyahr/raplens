import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Kehadiran",
    kelas: 4,
  },
  {
    name: "Keterlambatan",
    kelas: 5,
  },
  {
    name: "Kepatuhan",
    kelas: 5,
  },
  {
    name: "Kerapihan",
    kelas: 5,
  },
];

export default function Kedisiplinan() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="kelas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
