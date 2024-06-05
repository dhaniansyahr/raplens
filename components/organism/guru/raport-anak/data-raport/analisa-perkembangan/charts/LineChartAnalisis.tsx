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
    name: "0",
    tugas1: 0,
    tugas2: 0,
  },
  {
    name: "Tugas 1",
    tugas1: 7,
    tugas2: 8,
  },
  {
    name: "Tugas 2",
    tugas1: 6,
    tugas2: 7,
  },
  {
    name: "Tugas 3",
    tugas1: 8,
    tugas2: 9,
  },
  {
    name: "Tugas 4",
    tugas1: 9,
    tugas2: 10,
  },
];

export default function LineChartAnalisis() {
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
          dataKey="tugas1"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="linear" dataKey="tugas2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
