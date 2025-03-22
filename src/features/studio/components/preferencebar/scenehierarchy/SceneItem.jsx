import useStudioStore from "@/features/studio/stores/useStudioStore"
import { Lock, LockOpen, Leaf } from 'lucide-react'

export default function SceneItem({item}) {
    const { id, assetType, displayName, locked } = item

    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)
    const components = useStudioStore((state) => state.components)
    const setSelectedObject = useStudioStore((state) => state.setSelectedObject)
    const toggleLockOnComponent = useStudioStore((state) => state.toggleLockOnComponent)

    const handleHighlight = () => {
        if (locked) return
        const usedComponentObjectRef = components.find((c) => c.id === id)?.objectReference ?? null;
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

    const icons = {
        plant: <Leaf size={16} className={'text-green-400'} />,
        // rock: <Gem />,
        // wood: <Tree />,
    }

    return (
        <div className={`${highlightedObjectId === id && 'bg-lime-800'} flex flex-row justify-between rounded p-1 items-center`}>
            <div className={'flex flex-row items-center'}>
                {icons[assetType]}
                <span className={'cursor-pointer ml-1'} onClick={handleHighlight}>{ displayName }</span>
            </div>
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