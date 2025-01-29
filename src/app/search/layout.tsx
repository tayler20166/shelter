import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Find your breed",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="container m-auto flex">
        {children}
      </div>
  );
}
