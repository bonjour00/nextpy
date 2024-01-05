"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import useCourse from "../_hooks/useDatas";
import Rating from "@mui/material/Rating";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Tab,
  Tabs,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { useAppSelector } from "@/redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import useMy from "../_hooks/useMyArticle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MyArticles() {
  const pathname = usePathname().substring(1);
  const router = useRouter();
  const jumpLink = (item: any) => {
    router.push(pathname + "/" + item.id);
  };
  const [
    courseList,
    setOrder,
    loading,
    order,
    setUpdated,
    tab,
    setTab,
    articleList,
    deleteArticle,
  ] = useMy();
  return loading ? (
    <Box
      sx={{
        flexDirection: "column",
        alignItems: "center",
        width: 1058,
        margin: "auto",
        minWidth: 1058,
      }}
    >
      <Skeleton variant="rectangular" width={1058} height={200} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton variant="rectangular" width={1058} height={200} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      gap={3} // 根据需要调整卡片之间的间距
      flexWrap="wrap"
      margin={3}
    >
      {articleList.length == 0 && <p>您尚未發佈文章，快去發佈吧!</p>}
      {articleList.map((article: any) => (
        <Card key={article.id} sx={{ width: 400, marginBottom: 2 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" onClick={() => jumpLink(article)}>
                {article.title}
              </Typography>
              <DeleteIcon
                sx={{ margin: "5px" }}
                onClick={() => deleteArticle(article.id)}
              />
            </div>
            <Typography variant="body2" onClick={() => jumpLink(article)}>
              {article.author}
            </Typography>
            <Typography variant="body2" onClick={() => jumpLink(article)}>
              {article.updatedAt}/點閱率:
              {article.viewCount}
            </Typography>
          </div>
          <AspectRatio
            minHeight="120px"
            maxHeight="200px"
            onClick={() => jumpLink(article)}
          >
            {article.coverImage && (
              <img src={article.coverImage.url} loading="lazy" alt="" />
            )}
          </AspectRatio>
          <CardContent onClick={() => jumpLink(article)}>
            <Typography fontSize="lg" fontWeight="lg">
              {article.previewDescription}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
