"use client";
import NavBar from "@/components/layout/navbar/Navbar";
import { useAPI } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import apiConfig from "../config/api.json";
import Banner from "@/components/Banner";
import Course from "@/components/Course";

export default function Home() {
  const { fetchData } = useAPI();
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      const response = await fetchData({
        apiUrl: `${apiConfig.site.homePageUrl}`,
      });
      setResponse(response);
      console.log("Home Page Data:", response);
    };
    fetchHomePageData();
  }, []);

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <NavBar />
      <Banner title={response.title} description={response.description} media={response.media} checklist={response.checklist} cta_text={response.cta_text} />
      <Course sections={response.sections} />
    </div>
  );
}
