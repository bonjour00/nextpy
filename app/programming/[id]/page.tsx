"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useCourseDetail from "@/app/_hooks/useDetail";
import Description from "@/app/_conponent/description";
import InfoCourse from "@/app/_conponent/info";
import Accordiong from "@/app/_conponent/according";
import Chapter from "@/app/_conponent/chapter";
import Message from "@/app/_conponent/message";
import { Box, Card, CardContent, Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import { AspectRatio } from "@mui/joy";

export default function LanguageDetail({ params }: { params: { id: string } }) {
  const [
    courseDetail,
    loading,
    comments,
    setPage,
    page,
    articleDetail,
    writeCourseComment,
  ] = useCourseDetail({
    id: params.id,
  });
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return tab != "1" ? (
    <>
      {courseDetail ? (
        <InfoCourse
          video={courseDetail && courseDetail.productDetails.video}
          loading={loading}
          productDetails={courseDetail.productDetails}
        />
      ) : (
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
      )}
      <br />
      <br />
      {courseDetail && (
        <Description
          description={courseDetail && courseDetail.productDetails.description}
          video={courseDetail && courseDetail.productDetails.video}
          loading={loading}
        />
      )}
      <br />
      {courseDetail && (
        <Accordiong productDetails={courseDetail.productDetails} />
      )}
      <br />
      {courseDetail && <Chapter chapters={courseDetail.chapters} />}
      {courseDetail && (
        <Message
          comments={comments}
          setPage={setPage}
          page={page}
          writeCourseComment={writeCourseComment}
        />
      )}
    </>
  ) : (
    articleDetail && (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: "70%", marginBottom: 2 }}>
          <div>
            <Typography variant="h6">{articleDetail.title}</Typography>
            <Typography variant="body2">{articleDetail.author}</Typography>
            <Typography variant="body2">
              {articleDetail.updatedAt}/點閱率:{articleDetail.viewCount}
            </Typography>
          </div>
          <AspectRatio minHeight="120px" maxHeight="500px">
            {articleDetail.coverImage && (
              <img src={articleDetail.coverImage.url} loading="lazy" alt="" />
            )}
          </AspectRatio>
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
    )
  );
}
