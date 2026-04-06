import AnalysisView from "@/features/manage/analysis/AnalysisView";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "データ分析",
    robots: { index: false },
};

const AnalysisPage = () => {
    return <AnalysisView />;
};

export default AnalysisPage;
