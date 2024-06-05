import axios from "axios";
import { useEffect, useState } from "react";
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

export default function AkademikSiswa({ datas }: { datas: any }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={datas}
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
        <Area
          type="monotone"
          dataKey={"nilai"}
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        {/* ))} */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
