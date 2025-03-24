'use client'

import useSWR from "swr";
import { formatMongoISODate } from "@/lib/dateHelper";
import {useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import useStudioStore from "@/features/studio/stores/useStudioStore";

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Projects() {
    const {data: aquariumList, error, isLoading} = useSWR("/api/aquariums/list", fetcher) // ez a GET api/aquariums
    const locale = useLocale()
    const router = useRouter()
    const loadStudioData = useStudioStore((state) => state.loadStudioData)

    const setupStudio = (aquariumData) => {
        const {components, light} = aquariumData
        loadStudioData({components, light})

        router.push(`/${locale}/studio/${aquariumData._id.toString()}`)
    }


    if(isLoading) {
        return <div className={"w-1/2 h-1/2 bg-sky-900 rounded-xl shadow-2xl shadow-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10"}>
                Loading...
        </div>
    }
    if(error) {
        return <div className={"w-1/2 h-1/2 bg-sky-900 rounded-xl shadow-2xl shadow-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10"}>
            Error happened...
        </div>
    }

    return (
        <div className={"flex flex-col items-center w-1/2 h-1/2 p-3 bg-sky-900 rounded-xl shadow-2xl shadow-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10"}>
            <h1 className={"text-2xl mb-3"}>My Personal Projects</h1>
            <div className={"flex flex-col w-full scrollbar scrollbar-thumb-sky-50  scrollbar-track-sky-800 h-full overflow-y-auto"}>
                {aquariumList.map((aquariumData, i) =>
                    <div key={i} className={"flex flex-row justify-between items-center w-full bg-amber-700 rounded-md p-2"}>
                        <div>
                            <h5>{aquariumData.name}</h5>
                            <span className={"text-sm"}>{formatMongoISODate(aquariumData.updatedAt)}</span>
                        </div>
                        <div className={"flex flex-row gap-5"}>
                            <button
                                className={"bg-sky-700 p-2 rounded-md shadow-md cursor-pointer"}

                                onClick={() => setupStudio(aquariumData)}>Betöltés</button>
                            <button>Törlés</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}