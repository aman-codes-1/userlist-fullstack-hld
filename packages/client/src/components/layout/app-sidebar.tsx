"use client";

import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { sidebarData } from "./data/sidebar-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        <Suspense fallback={null}>
          {sidebarData.navGroups.map((props: any) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
