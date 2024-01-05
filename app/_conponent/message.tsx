import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/app/_firebase/Config";
import { useAppSelector } from "@/redux/hooks";

export default function Message({
  comments,
  setPage,
  page,
  writeCourseComment,
}: any) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };
  const auth = getAuth(app);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const user = useAppSelector((state) => state.auth);
  const hide = () => {
    setOpen(false);
  };
  const write = () => {
    writeCourseComment(message);
    setOpen(false);
    setMessage("");
  };
  return (
    <>
      <Typography
        level="title-lg"
        sx={{
          width: "70%",
          overflow: "auto",
          resize: "horizontal",
          margin: "auto", // 或者 mx: "auto"
        }}
      >
        留言
        {user.user.uid ? (
          <Button
            sx={{
              marginLeft: "30px",
            }}
            onClick={() => setOpen(true)}
            style={{ background: "#1565C0" }}
          >
            我要留言
          </Button>
        ) : (
          <p>登入享有留言功能~</p>
        )}
      </Typography>
      {comments.comments &&
        comments.comments.map((comment: any) => (
          <Card
            key={comment.id}
            variant="outlined"
            sx={{
              width: "70%",
              overflow: "auto",
              resize: "horizontal",
              margin: "auto", // 或者 mx: "auto"
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={comment.profileImageUrl} size="lg" sx={{ mr: 2 }} />
              <Typography level="title-lg">{comment.name}</Typography>
            </Box>
            <CardContent>
              <Typography level="body-sm">{comment.content}</Typography>
            </CardContent>
          </Card>
        ))}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2} // 设置顶部边距，根据需要调整
      >
        <Pagination
          count={comments.pages}
          page={page + 1}
          onChange={handleChange}
        />
      </Box>
      <Dialog open={open} onClose={hide} aria-labelledby="留言">
        <DialogTitle>新增留言</DialogTitle>
        <DialogContent>
          <p />
          <br />
          <TextField
            label="新增留言"
            variant="outlined"
            name="comment"
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
          <Button onClick={write} style={{ background: "#1565C0" }}>
            新增
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
