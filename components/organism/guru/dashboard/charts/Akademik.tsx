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
    name: "Matematika",
    kelas: 90,
  },
  {
    name: "Bahasa Inggris",
    kelas: 80,
  },
  {
    name: "IPA",
    kelas: 85,
  },
  {
    name: "Seni",
    kelas: 80,
  },
  {
    name: "Bahasa Indonesia",
    kelas: 70,
  },
  {
    name: "IPS",
    kelas: 75,
  },
];

export default function Akademik() {
  return (
    <ResponsiveContainer width="100%" height={500}>
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
        <Bar dataKey="kelas" fill="#BCF7FF" />
      </BarChart>
    </ResponsiveContainer>
  );
}
