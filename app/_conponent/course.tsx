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
import moment from "moment";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Course() {
  type Course = {
    id: string;
    author: string;
    title: string;
    metaDescription: string;
    averageRating: number;
    numSoldTickets: number;
    price: number; //原價;
    discountPrice: number;
    coverImage: string;
    numRating: number;
  };

  const [
    data,
    setOrder,
    loading,
    order,
    setUpdated,
    tab,
    setTab,
    articleList,
    writeCourseComment,
  ] = useCourse();
  const pathname = usePathname().substring(1);
  const router = useRouter();
  const jumpHerf = (item: any) => {
    router.push(item ? pathname + "/" + item.id : pathname);
  };
  const handleChange = (event: any) => {
    setOrder(event.target.value);
    setUpdated((currentValue) => currentValue + 1);
  };
  console.log(articleList);
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setUpdated((currentValue) => currentValue + 1);
  };
  const jumpLink = (item: any) => {
    router.push(item ? pathname + "/" + item.id + "?tab=1" : pathname);
  };
  const user = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [titles, setTitles] = useState("");
  const [description, setDescription] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };
  //toolbar:false
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];
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
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleTab} centered>
          <Tab label="課程" />
          <Tab label="文章" />
        </Tabs>
      </Box>
      {tab == 1 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            {user.user.uid ? (
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                style={{ background: "#1565C0" }}
              >
                發布文章
              </Button>
            ) : (
              <p>登入可發佈文章喔~</p>
            )}
          </div>

          <Dialog open={open} onClose={hide} aria-labelledby="留言">
            <DialogTitle>發佈文章</DialogTitle>
            <DialogContent>
              <br />
              <TextField
                label="標題"
                variant="outlined"
                name="title"
                multiline
                fullWidth
                value={titles}
                onChange={(e) => setTitles(e.target.value)}
              />
              <br />
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
              <br />
              <br />
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
        </>
      )}
      {tab == 0 && (
        <>
          <Grid container justifyContent="flex-end">
            <FormControl
              sx={{ m: 1, minWidth: 120, marginRight: "5%" }}
              size="small"
            >
              {!loading && `共找到: ${data.length}項 `}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={order}
                onChange={handleChange}
              >
                <MenuItem value={"FEEDBACK_SCORE"}>依評價</MenuItem>
                <MenuItem value={"price"}>依價格</MenuItem>
                <MenuItem value={"free"}>為免費</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={4} justifyContent="center">
            {(loading ? Array.from(new Array(15)) : data).map((item, index) => (
              <Grid
                item
                key={item ? item.id : index}
                onClick={() => jumpHerf(item)}
              >
                <Box sx={{ width: 330 }}>
                  {item ? (
                    <img
                      style={{ width: 330, height: 186 }}
                      alt={item.title}
                      src={item.coverImage}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={330} height={186} />
                  )}
                  {item ? (
                    <>
                      <Box
                        sx={{ display: "flex", alignItems: "center", pr: 2 }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                          }}
                        >
                          <Typography gutterBottom variant="body1">
                            {item.title}
                          </Typography>
                          <Typography
                            display="block"
                            variant="caption"
                            color="text.secondary"
                          >
                            {item.author}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.averageRating}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ ml: 0.5 }}
                            >
                              {`${item.averageRating}(${item.numRating}) • ${item.numSoldTickets}人`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box style={{ display: "flex" }}>
                        <Typography
                          gutterBottom
                          variant="body1"
                          style={{ marginRight: "10px" }}
                        >
                          NT${item.discountPrice}
                        </Typography>
                        {item.discountPrice != item.price && (
                          <Typography
                            variant="body2"
                            style={{
                              display: "inline-block",
                              position: "relative",
                              textDecoration: "line-through",
                              textDecorationColor: "red",
                            }}
                          >
                            NT${item.price}
                          </Typography>
                        )}
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {tab == 1 &&
        (loading ? (
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
            {articleList.map((article: any) => (
              <Card
                key={article.id}
                sx={{ width: 400, marginBottom: 2 }}
                onClick={() => jumpLink(article)}
              >
                <div>
                  <Typography variant="h6">{article.title}</Typography>
                  <Typography variant="body2">{article.author}</Typography>
                  <Typography variant="body2">
                    {article.updatedAt}/點閱率:
                    {article.viewCount}
                  </Typography>
                </div>
                <AspectRatio minHeight="120px" maxHeight="200px">
                  {article.coverImage && (
                    <img src={article.coverImage.url} loading="lazy" alt="" />
                  )}
                </AspectRatio>
                <CardContent>
                  <Typography fontSize="lg" fontWeight="lg">
                    {article.previewDescription}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
    </>
  );
}
