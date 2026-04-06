import AppBreadcrumbs from "@/util/components/AppBreadcrumbs";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppBreadcrumbs />
            {children}
        </>
    );
};

export default ManageLayout;
