"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { AspectRatio } from "@mui/joy";
import React, { useEffect, useState } from "react";
import useMy from "@/app/_hooks/useMyArticle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import useCourse from "@/app/_hooks/useDatas";
import { usePathname } from "next/navigation";

export default function ArtDetail({ params }: { params: { id: string } }) {
  const [
    courseList,
    setOrder,
    loading,
    order,
    setUpdated,
    tab,
    setTab,
    articleDetails,
    deleteArticle,
    writeCourseComment,
    articleDetail,
  ] = useMy();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [titles, setTitles] = useState("");
  const [description, setDescription] = useState("");

  const pathname = usePathname().substring(1);

  const hide = () => {
    setOpen(false);
  };
  const write = () => {
    writeCourseComment(message, titles, description);
    setOpen(false);
    setMessage("");
    setDescription("");
    setTitles("");
  };

  return (
    <div>
      <Box
        key={articleDetail.id}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: "70%", marginBottom: 2 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ margin: "5px" }} variant="h6">
                {articleDetail.title}
              </Typography>
              <div style={{ display: "flex" }}>
                <EditIcon
                  sx={{ margin: "10px" }}
                  onClick={() => setOpen(true)}
                />
                <DeleteIcon
                  sx={{ margin: "10px" }}
                  onClick={() => deleteArticle(articleDetail.id)}
                />
              </div>
            </div>
            <Typography sx={{ margin: "5px" }} variant="body2">
              {articleDetail.author}
            </Typography>
            <Typography sx={{ margin: "5px" }} variant="body2">
              {articleDetail.updatedAt}/點閱率:{articleDetail.viewCount}
            </Typography>
          </div>
          {/* <AspectRatio minHeight="120px" maxHeight="500px">
              {articleDetail.coverImage && (
                <img src={articleDetail.coverImage.url} loading="lazy" alt="" />
              )}
            </AspectRatio> */}
          <hr />
          <CardContent>
            <Typography fontSize="lg" fontWeight="lg">
              {articleDetail.previewDescription}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: articleDetail.content }}
            />
          </CardContent>
        </Card>
      </Box>

      <Dialog open={open} onClose={hide} aria-labelledby="留言">
        <DialogTitle>發佈文章</DialogTitle>
        <DialogContent>
          <p />
          <TextField
            label="標題"
            variant="outlined"
            name="title"
            multiline
            fullWidth
            value={titles}
            onChange={(e) => setTitles(e.target.value)}
          />
          <p />
          <br />
          <TextField
            label="摘要"
            variant="outlined"
            name="description"
            multiline
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p /> <br />
          <TextField
            label="內文"
            variant="outlined"
            name="message"
            multiline
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <ReactQuill
          theme="snow"
          // readOnly={true}
          modules={quillModules}
          formats={quillFormats}
          value={message}
          onChange={setMessage}
        /> */}
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button onClick={write}>發佈</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
