'use client'

import {useEffect, useState} from "react";
import useSWR from "swr";
import SceneItem from "@/features/studio/components/preferencebar/scenehierarchy/SceneItem";
import { formatMongoISODate } from "@/lib/dateHelper";

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Projects() {
    const {data: aquariumList, error, isLoading} = useSWR("/api/aquariums/list", fetcher)

    if(isLoading) {
        return <div className={"w-1/2 h-1/2 bg-sky-900 rounded-xl shadow-2xl shadow-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10"}>
                Loading...
        </div>
    }
    if(isLoading) {
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
                            <h5>{aquariumData._id}</h5>
                            <span>{formatMongoISODate(aquariumData.updatedAt)}</span>
                        </div>
                        <div className={"flex flex-row"}>
                            <button>Betöltés</button>
                            <button>Törlés</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}