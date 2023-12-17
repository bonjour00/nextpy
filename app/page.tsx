import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { AspectRatio, Button, IconButton } from "@mui/joy";

export default function Home() {
  return (
    <Box component="ul" sx={{ gap: 2, flexWrap: "wrap", p: 0, m: 0 }}>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            投身學海汪洋
          </Typography>
        </CardContent>
      </Card>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
      >
        <Card sx={{ width: "80%" }}>
          <div>
            <Typography level="title-lg">歡迎來到Educarion</Typography>
            <Typography level="body-sm">
              您可以在這裡尋找您有興趣的科目及課程
            </Typography>
          </div>

          <CardContent orientation="horizontal">
            <div>
              <Typography fontSize="lg" fontWeight="lg">
                我們也會定期舉辦一些小活動
              </Typography>
              <Typography fontSize="lg" fontWeight="lg">
                而這個月為投資理財月，我們結合了python的機器學習以及金融知識!
              </Typography>
            </div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              去看看
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
