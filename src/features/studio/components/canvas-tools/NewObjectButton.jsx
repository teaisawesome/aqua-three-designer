import {Box} from "lucide-react";

export default function NewObjectButton() {
    return (
        <div className={'absolute bottom-55 right-4'}>
            <button className={"flex flex-row rounded-full border-2 shadow-lg p-5 bg-sky-900/50 backdrop-blur-sm active:scale-95 transition duration-150 ease-in-out" }>
                <Box className={"size-10"}></Box>
            </button>
        </div>
    )
}