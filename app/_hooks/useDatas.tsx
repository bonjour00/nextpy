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
import { useAppSelector } from "@/redux/hooks";

export default function useCourse() {
  const pathname = usePathname().substring(1);
  const [courseList, setCourseList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [order, setOrder] = useState("FEEDBACK_SCORE");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [tab, setTab] = useState(0);
  const user = useAppSelector((state) => state.auth);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api?groups=${pathname}&sort=${order}`);
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
        const result = await axios.get(`/api/articles?groups=${pathname}`);
        setArticleList(result.data);
        console.log(result.data, "art");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchArticles();
    tab == 0 ? fetchCourses() : fetchArticles();
  }, [updated]);
  const writeCourseComment = async (
    message: string,
    title: string,
    description: string
  ) => {
    try {
      const date = Date.now();
      const result = await axios.get(
        `http://127.0.0.1:5000/articleWrite?author=${user.user.name}&title=${title}&previewDescription=${description}
       &uid=${user.user.uid}&content=${message}&groups=${pathname}`
      );
      console.log(result, "write");
      setUpdated((curr) => curr + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return [
    courseList,
    setOrder,
    loading,
    order,
    setUpdated,
    tab,
    setTab,
    articleList,
    writeCourseComment,
  ] as const;
}
