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
    name: "Sepak Bola",
    kelas: 5,
    siswa: 10,
  },
  {
    name: "Bulu Tangkis",
    kelas: 7,
    siswa: 8,
  },
  {
    name: "Bola Voli",
    kelas: 8,
    siswa: 7,
  },
  {
    name: "Atletik",
    kelas: 9,
    siswa: 6,
  },
  {
    name: "Tenis Meja",
    kelas: 10,
    siswa: 5,
  },
  {
    name: "Bola Basket",
    kelas: 6,
    siswa: 9,
  },
];

export default function Olahraga() {
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
        <Bar
          dataKey="kelas"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="siswa"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
