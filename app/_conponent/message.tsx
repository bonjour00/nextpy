import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Pagination } from "@mui/material";

export default function Message({ comments, setPage, page }: any) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
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
    </>
  );
}
