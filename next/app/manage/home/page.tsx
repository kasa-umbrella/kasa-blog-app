import HomeView from "@/features/manage/home/HomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "管理画面",
    robots: { index: false },
};

const HomePage = () => {
    return <HomeView />;
};

export default HomePage;
