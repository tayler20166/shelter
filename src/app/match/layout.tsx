import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Shelter | Match",
  description: "This website purpose is to help a dog-lover like yourself search through a database of shelter dogs, with the hope of finding a lucky dog a new home",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
