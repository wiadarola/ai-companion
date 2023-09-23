import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/CompanionForm";

interface ComapnionIdPageProps {
    params: {
        companionId: string;
    };
};

const ComapnionIdPage: React.FC<ComapnionIdPageProps> = async ({ params }) => {
    // TODO: Check subscription

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <div>
            <CompanionForm initialData={companion} categories={categories} />
        </div>
    );
}

export default ComapnionIdPage;