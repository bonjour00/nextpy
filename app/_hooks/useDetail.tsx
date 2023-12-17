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
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://nextpy-bonjour00s-projects.vercel.app/api/courseDetail?id=${id}    `
        );
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
        const result = await axios.get(
          `https://nextpy-bonjour00s-projects.vercel.app/api/articlesDetail?id=${id}    `
        );
        setArticleDetail(result.data);
        // console.log(result.data);
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
        const result = await axios.get(
          `hhttps://nextpy-bonjour00s-projects.vercel.app/api/comment?id=${id}&page=${page}`
        );
        setComments(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    tab != "1" && fetchCourseComment();
  }, [page]);

  return [
    courseDetail,
    loading,
    comments,
    setPage,
    page,
    articleDetail,
  ] as const;
}
