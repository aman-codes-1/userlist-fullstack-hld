import type { Metadata } from "next";
import "@/app/ui/global.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/contexts/theme-context";
import { FontProvider } from "@/contexts/font-context";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const metadata: Metadata = {
  title: "Users List",
  description: "User Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light">
          <FontProvider>
            <Toaster richColors closeButton />
            <SidebarProvider defaultOpen>
              <AppSidebar />
              <div
                id="content"
                className={cn(
                  "ml-auto w-full max-w-full",
                  "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
                  "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
                  "sm:transition-[width] sm:duration-200 sm:ease-linear",
                  "flex h-svh flex-col",
                  "group-data-[scroll-locked=1]/body:h-full",
                  "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
                )}
              >
                {children}
              </div>
            </SidebarProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
