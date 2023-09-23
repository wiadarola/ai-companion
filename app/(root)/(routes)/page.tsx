import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";
import Categories from "@/components/Categories";
import { currentUser } from "@clerk/nextjs";
import Companions from "@/components/Companions";

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const RootPage: React.FC<RootPageProps> = async ({ searchParams }) => {
    const user = await currentUser();

    const data = await prismadb.companion.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name,
            },
            userId: "user_2VlkYg7lPaUBaG0ZxFwcv6orhuL" || user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    messages: true,
                }
            }
        }
    })
    const categories = await prismadb.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    );
}

export default RootPage;