import { Category, Companion } from "@prisma/client";

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const CompanionForm: React.FunctionComponent<CompanionFormProps> = ({ categories, initialData }) => {
    return (
        <div>

        </div>
    );
}

export default CompanionForm;