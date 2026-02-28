'use client';

import { useRouter } from "next/navigation";

// TODO: 仮実装 - 後で削除
const homePage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        router.push("/manage/login");
    };

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page of the manage section.</p>
            {/* TODO: 仮ログアウトボタン - 後で削除 */}
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
};

export default homePage;
