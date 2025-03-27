import useStudioStore from "@/features/studio/stores/useStudioStore"
import {Lock, LockOpen, Leaf, EllipsisVertical, Trash2, PackageX} from 'lucide-react'
import {useState} from "react";

export default function SceneItem({item}) {
    const { id, assetType, displayName, locked } = item

    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)
    const components = useStudioStore((state) => state.components)
    const setSelectedObject = useStudioStore((state) => state.setSelectedObject)
    const toggleLockOnComponent = useStudioStore((state) => state.toggleLockOnComponent)
    const removeComponent = useStudioStore((state) => state.removeComponent)

    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(prev => !prev)
    const closeMenu = () => setMenuOpen(false)

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
            <div className={'flex flex-row items-center'} onMouseLeave={closeMenu}>
                <div className={`flex flex-row items-center justify-center bg-sky-900 pl-1.5 py-1.5 rounded-lg`}>
                    <button onClick={handleToggleLock} className={"p1 cursor-pointer"}>
                        {locked ? (
                            <Lock size={20} className={'text-red-500'} />
                        ) : (
                            <LockOpen size={20} className={'text-green-500'}/>
                        )}
                    </button>
                    <button
                        onClick={() => removeComponent(id)}
                        className={`
                            cursor-pointer transition-all duration-300 group
                            ${menuOpen ? 'opacity-100 scale-100 w-6 ml-2.5 hover:text-yellow-400' : 'opacity-0 scale-0 w-0'}
                            overflow-hidden
                        `}
                    >
                        <Trash2 className="text-red-500" size={20}/>
                    </button>
                    <button onClick={toggleMenu} className={"cursor-pointer"}><EllipsisVertical size={20}/></button>
                </div>
            </div>
        </div>
    )
}