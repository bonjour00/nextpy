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
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { getAuth } from "firebase/auth";
import app from "@/app/_firebase/Config";
type Comment = {
  id: string;
  name: string;
  profileImageUrl: string;
  content: string;
};
type Item = { id: string; chapterNumber: string; title: string };

type Chapter = {
  id: string;
  title: string;
  chapterNumber: string;
  items: Item[];
};

type ProductDetail = {
  author: string;
  title: string;
  metaDescription: string;
  averageRating: number;
  numSoldTickets: number;
  price: number; //原價;
  discountPrice: number;
  description: string;
  targetGroup: string;
  willLearn: string;
  requiredTools: string;
  video: string;
  numRating: number;
  profileImageUrl: string;
};
type CourseDetail = {
  productDetails: ProductDetail;
  // comments: Comment[];
  chapters: Chapter[];
};
export default function useCourseDetail({ id }: { id: string }) {
  //   const pathname = usePathname().substring(1);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [articleDetail, setArticleDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(0);
  const [updated, setUpdated] = useState(0);
  const auth = getAuth(app);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        // https://nextpy-bonjour00s-projects.vercel.app
        const result = await axios.get(`/api/courseDetail?id=${id}    `);
        setCourseDetail(result.data);
        setLoading(false);
        console.log(result.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api/articlesDetail?id=${id}    `);
        setArticleDetail(result.data);
        console.log(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    tab == "1" ? fetchArticleDetail() : fetchCourseDetail();
  }, []);

  useEffect(() => {
    const fetchCourseComment = async () => {
      try {
        const result = await axios.get(`/api/comment?id=${id}&page=${page}`);
        setComments(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    tab != "1" && fetchCourseComment();
  }, [page, updated]);

  const writeCourseComment = async (message: string) => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:5000/courseCommentWrite?id=${id}&content=${message}&name=${auth.currentUser?.displayName}&profileImageUrl=${auth.currentUser?.photoURL}`
      );
      console.log(result, "write");
      setUpdated((curr) => curr + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return [
    courseDetail,
    loading,
    comments,
    setPage,
    page,
    articleDetail,
    writeCourseComment,
  ] as const;
}
