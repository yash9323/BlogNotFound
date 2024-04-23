import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
    const session = await getServerSession();
    if (!session) {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <a href="/landing"><h1 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">&lt; BLOG NOT FOUND /&gt;</h1></a>
                {children}
            </div>
        )
    }
    else{
        redirect("/");
    } 
}