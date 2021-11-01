import type { FC } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import Logo from "./Logo";

const sections = [
  {
    title: "Placeholders",
    links: [
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
];

const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: "background.default",
      pb: 6,
      pt: {
        md: 15,
        xs: 6,
      },
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Typography color="textSecondary" variant="caption">
        All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
