import SearchResultsPage from "@/components/search/search-results";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Tools | UtilityHub",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return <SearchResultsPage />;
}
