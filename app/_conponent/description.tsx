"use client";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

export default function Description({ description, loading }: any) {
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
      sx={{
        maxWidth: 1058,
        margin: "auto",
        width: "100%",
        height: 550,
        overflowY: "scroll",
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        },
      }}
    >
      <Card>
        <CardContent sx={{ maxWidth: 1058 }}>
          <b>課程內容:</b>
          <Typography dangerouslySetInnerHTML={{ __html: description }} />
        </CardContent>
      </Card>
    </Box>
  );
}
