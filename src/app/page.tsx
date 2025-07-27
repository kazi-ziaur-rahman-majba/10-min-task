"use client";
import NavBar from "@/components/layout/navbar/Navbar";
import { useAPI } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import apiConfig from "../config/api.json";

export default function Home() {
  const { fetchData } = useAPI();
	const [response, setResponse] = useState<any>(null);


	useEffect(() => {
		const fetchHomePageData = async () => {
			const response = await fetchData({ apiUrl: `${apiConfig.site.homePageUrl}` });
			setResponse(response);
      console.log("Home Page Data:", response);
		};
		fetchHomePageData();
	}, []);

  return (
    <div className="text-red-500 text-2xl">
      <NavBar />

    </div>
  );
}
