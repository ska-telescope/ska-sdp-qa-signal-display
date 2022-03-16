import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import { NavItem } from "./nav-item";

const items = [
  {
    title: "Spectrum Plot",
    href: "/plot/spectrum",
    icon: <TimelineIcon fontSize="small" />,
  },
  {
    title: "Phase Spectrograms",
    href: "/plot/spectrograms",
    icon: <WaterfallChartIcon fontSize="small" />,
  },
  {
    title: "RFI QA",
    href: "/plot/rfi",
    icon: <SignalCellularAltIcon fontSize="small" />,
  },
];

export const DashboardSidebar = (props) => {
  const theme = useTheme();
  const { open, onClose } = props;
  const router = useRouter();
  // @ts-expect-error -- investigate
  const lgUp = useMediaQuery((theme) => theme?.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "background.default",
              borderRadius: 1,
              display: "flex",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box sx={{ ml: 2 }}>
              <img src="/static/logos/logo.png" />

              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography color="primary" variant="h5" textAlign="center">
                  QA Metrics
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 0,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        ></Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "rgb(226 232 240)",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
