import LoginForm from "@/features/manage/login/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ログイン",
    robots: { index: false },
};

const LoginPage = () => {
    return (
        <LoginForm />
    );
};

export default LoginPage;