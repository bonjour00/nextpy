"use client";
// import {
//   collection,
//   getFirestore,
//   addDoc,
//   serverTimestamp,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
//   OrderByDirection,
//   where,
// } from "firebase/firestore";
// import app from "@/app/_firebase/Config";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function useCourse() {
  const pathname = usePathname().substring(1);
  const [courseList, setCourseList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [order, setOrder] = useState("FEEDBACK_SCORE");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://nextpy-bonjour00s-projects.vercel.app/api?groups=${pathname}&sort=${order}`
        );
        setCourseList(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://nextpy-bonjour00s-projects.vercel.app/api/articles?groups=${pathname}`
        );
        setArticleList(result.data);
        console.log(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchArticles();
    tab == 0 ? fetchCourses() : fetchArticles();
  }, [updated]);

  return [
    courseList,
    setOrder,
    loading,
    order,
    setUpdated,
    tab,
    setTab,
    articleList,
  ] as const;
}
