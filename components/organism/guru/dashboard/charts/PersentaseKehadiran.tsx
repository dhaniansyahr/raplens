import axios from "axios";
import React, { PureComponent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#ADD8E6",
  "#FFA07A",
  "#FFBB28",
  "#FF8042",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PersentaseKehadiran() {
  const [data, setData] = useState<any>(null);
  const [keys, setKeys] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const getData = async (token: string) => {
    setLoading(true);
    toast.loading("Loading...");
    axios
      .get("/api/nilai/persentase-kehadiran", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setData(res.data.data);

        const convertData = res.data.data.map((item: any) => {
          const obj: any = {
            year: item.year,
          };
          Object.keys(item)
            .filter((key: any) => key !== "year")
            .forEach((key: any) => {
              obj[key] = item[key];
            });

          return obj;
        });

        setData(convertData);
        setKeys(
          Object.keys(convertData[0]).filter((item: any) => item !== "year")
        );

        setLoading(false);
        toast.dismiss();
        toast.success("Data berhasil diambil!");
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast.error("Data gagal diambil!");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      setToken(data.token);
      getData(data?.token);
    }
  }, []);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={800} height={800}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {keys?.map((key: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
