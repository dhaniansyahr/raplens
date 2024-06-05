import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SikapDanPerilakuSiswa({ datas }: { datas: any }) {
  //   console.log("Data in SikapDanPerilaku : ", datas);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={datas}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="kelas" stackId="a" fill="#8884d8" />
        <Bar dataKey="siswa" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
