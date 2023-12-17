import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import Switch from "@mui/joy/Switch";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ListItemContent from "@mui/joy/ListItemContent";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Chapter({ chapters }: any) {
  return (
    <AccordionGroup
      variant="plain"
      transition="0.2s"
      sx={{
        maxWidth: "70%",
        borderRadius: "md",
        margin: "auto", // 将 margin 设置为 auto 实现水平居中
        [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
          {
            paddingBlock: "1rem",
          },
        [`& .${accordionSummaryClasses.button}`]: {
          paddingBlock: "1rem",
        },
      }}
    >
      <Typography level="title-lg">預計單元</Typography>
      {chapters.map((chapter: any) => (
        <Accordion key={chapter.id}>
          <AccordionSummary>
            <Avatar color="primary">
              <MenuBookIcon />
            </Avatar>
            <ListItemContent>
              <Typography level="title-md">
                單元 {chapter.chapterNumber}
              </Typography>
              <Typography level="body-sm">{chapter.title}</Typography>
            </ListItemContent>
          </AccordionSummary>
          {chapter.items.map((item: any) => (
            <AccordionDetails key={item.id}>
              <ListItemContent>
                <Typography level="title-md">
                  小節{item.chapterNumber}
                </Typography>
                <Typography level="body-sm">{item.title}</Typography>
              </ListItemContent>
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </AccordionGroup>
  );
}
