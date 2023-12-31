"use client";

import qs from "query-string";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEventHandler, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const catagoryId = searchParams.get("catagoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const query = {
            name: debouncedValue,
            catagoryId: catagoryId
        }

        const url = qs.stringifyUrl({ url: window.location.href, query: query }, { skipEmptyString: true, skipNull: true });
        router.push(url);

    }, [debouncedValue, router, catagoryId])

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 bg-primary/10" onChange={onChange} value={value} />
        </div>
    );
}

export default SearchInput;