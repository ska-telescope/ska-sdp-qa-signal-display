import { useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import NavItem from "./nav-item";

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const items = [
  {
    title: "Spectrum Plot",
    href: "/plot/spectrumPage",
    icon: <TimelineIcon fontSize="small" />
  },
  {
    title: "Phase Spectrograms",
    href: "/plot/spectrogramTable",
    icon: <WaterfallChartIcon fontSize="small" />
  },
  {
    title: "RFI QA",
    href: "/plot/rfi",
    icon: <SignalCellularAltIcon fontSize="small" />
  }
];

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  onMobileClose,
  openMobile
}) => {
  const asPath = useRouter();
  const theme = useTheme();
  const screenIsMobile = !useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (screenIsMobile) {
      onMobileClose();
    }
  }, [screenIsMobile, onMobileClose, asPath]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
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
            p: 2
          }}
        >
          <Box sx={{ ml: 2 }}>
            {/* <img alt="skao logo" src="/static/logos/logo.png" />  */}

            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography color="primary" variant="h5" textAlign="center">
                QA Metrics
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Divider />
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
      <Box sx={{ px: 2, py: 3 }} />
    </Box>
  );

  if (!screenIsMobile) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "rgb(226 232 240)",
            color: "#FFFFFF",
            width: 280
          }
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
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280
        }
      }}
      sx={{ zIndex: (inTheme) => inTheme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
