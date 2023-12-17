import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import CardCover from "@mui/joy/CardCover";
import { Rating, Skeleton } from "@mui/material";

export default function InfoCourse({ loading, productDetails }: any) {
  return (
    <Box
      sx={{
        width: "70%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
        margin: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          bgcolor: "warning.300",
          left: "500px",
          top: "-24px",
          bottom: "-24px",
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={200} sx={{ minWidth: 345 }}>
          <CardCover>
            <video controls>
              <source src={productDetails.video} type="video/mp4" />
            </video>
          </CardCover>
        </AspectRatio>
        <CardContent>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {productDetails.author}
          </Typography>
          <Typography fontSize="xl" fontWeight="lg">
            {productDetails.title}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {productDetails.metaDescription}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1,
              my: 1,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                購課人數
              </Typography>
              <Typography fontWeight="lg">
                {productDetails.numSoldTickets}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                評價
              </Typography>
              <Typography
                fontWeight="lg"
                sx={{ display: "flex", alignItems: "center", maxHeight: 20 }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={productDetails.averageRating}
                  precision={0.1}
                  readOnly
                  size="small"
                  style={{ margin: "0", padding: "0" }}
                />
                {`${productDetails.averageRating}(${productDetails.numRating})`}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                入手價
              </Typography>
              <Box style={{ display: "flex" }}>
                <Typography
                  gutterBottom
                  style={{ marginRight: "10px" }}
                  fontWeight="lg"
                >
                  NT${productDetails.discountPrice}
                </Typography>
                {productDetails.discountPrice != productDetails.price && (
                  <Typography
                    fontWeight="lg"
                    style={{
                      display: "inline-block",
                      position: "relative",
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                    }}
                  >
                    NT${productDetails.price}
                  </Typography>
                )}
              </Box>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
