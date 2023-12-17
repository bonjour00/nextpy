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
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//   targetGroup: string;
//   willLearn: string;
//   requiredTools: string;
export default function Accordiong({ productDetails }: any) {
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
      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <PeopleIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">哪些人適合這堂課？</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <FormLabel>{productDetails.targetGroup}</FormLabel>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <SchoolIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">你可以學到</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <FormLabel>{productDetails.willLearn}</FormLabel>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <ShoppingCartIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">上課前的準備</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <FormLabel>{productDetails.requiredTools}</FormLabel>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
