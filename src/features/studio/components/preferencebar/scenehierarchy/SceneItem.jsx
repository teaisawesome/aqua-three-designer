import useStudioStore from "@/features/studio/stores/useStudioStore"
import { Lock, LockOpen } from 'lucide-react'

export default function SceneItem({item}) {
    const { id, displayName, locked } = item

    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)
    const usedComponents = useStudioStore((state) => state.usedComponents)
    const setSelectedObject = useStudioStore((state) => state.setSelectedObject)
    const toggleLockOnComponent = useStudioStore((state) => state.toggleLockOnComponent)

    const handleHighlight = () => {
        if (locked) return
        const usedComponentObjectRef = usedComponents.find((c) => c.id === id)?.objectReference ?? null;
        addHighlightedObjectId(highlightedObjectId === id ? null : id)
        setSelectedObject(highlightedObjectId === id ? null : usedComponentObjectRef)
    }
    const handleToggleLock = () => {
        toggleLockOnComponent(id)
        if (highlightedObjectId === id) {
            addHighlightedObjectId(null)
            setSelectedObject(null)
        }
    }

    return (
        <div className={`${highlightedObjectId === id && 'bg-lime-800'} flex flex-row justify-between rounded p-1 items-center`}>
            <span className={'cursor-pointer'} onClick={handleHighlight}>{ displayName }</span>
            <button onClick={handleToggleLock} className={"p1 cursor-pointer"}>
                {locked ? (
                    <Lock size={20} className={'text-red-500'} />
                ) : (
                    <LockOpen size={20} className={'text-green-500'}/>
                )}
            </button>
        </div>
    )
}