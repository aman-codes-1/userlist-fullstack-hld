import { IconLayoutDashboard } from "@tabler/icons-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Home",
          url: "/",
          icon: IconLayoutDashboard,
        },
      ],
    },
  ],
};
