import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { PureComponent, useEffect, useState } from "react";
import toast from "react-hot-toast";
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

export default function Akademik() {
  const [data, setData] = useState<any>(null);
  const [keys, setKeys] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();

  const getData = async () => {
    setLoading(true);
    toast.loading("Loading...");
    axios
      .get("/api/nilai/grafik-nilai-per-semester", {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
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
    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
        {keys?.map((key: any, index: number) => (
          <Bar key={index} dataKey={key} fill={"#BCF7FF"} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
