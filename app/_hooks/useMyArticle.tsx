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
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";

export default function useMy() {
  const pathname = usePathname().substring(1);
  const [courseList, setCourseList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [order, setOrder] = useState("FEEDBACK_SCORE");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const [articleDetail, setArticleDetail] = useState<any>({
    id: "",
    author: "",
    title: "",
    previewDescription: "",
    content: "",
    coverImage: "",
    viewCount: 0,
    updatedAt: "" as any,
  });

  const user = useAppSelector((state) => state.auth);
  useEffect(() => {
    const myArticles = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `http://127.0.0.1:5000/myArticles?uid=${user.user.uid}`
        );
        setArticleList(result.data);
        console.log(result.data, "artw");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    myArticles();
  }, [updated, user.user.uid]);
  useEffect(() => {
    articleList.length > 0 &&
      setArticleDetail(
        articleList.filter((x: any) => x.id == pathname.split("/")[1])[0]
      );
  }, [articleList]);
  const deleteArticle = async (id: string) => {
    Swal.fire({
      title: "確定刪除?",
      text: `將永久刪除這篇文章!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const result = await axios.get(
          `http://127.0.0.1:5000/myArticlesDel?id=${id}`
        );
        setUpdated((curr) => curr + 1);
        router.push("/articles");
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          text: `已刪除此文章`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  const writeCourseComment = async (
    message: string,
    title: string,
    description: string
  ) => {
    try {
      const date = Date.now();
      const result = await axios.get(
        `http://127.0.0.1:5000/articleUpdate?title=${title}&previewDescription=${description}
       }&content=${message}&id=${pathname.split("/")[1]}`
      );
      console.log(result.data, "write");
      setArticleDetail(result.data);
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
    deleteArticle,
    writeCourseComment,
    articleDetail,
  ] as const;
}
