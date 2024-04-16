import { Toaster } from "sonner";

const AuthLayout = ({ children }) => {
    return (
        <>
            <Toaster />

            <div className="flex flex-col items-center justify-center w-full">{children}</div>
        </>
    );
};

export default AuthLayout;
