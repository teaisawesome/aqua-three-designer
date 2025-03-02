import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function SceneItem({item}) {
    const { id, displayName } = item
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)

    const handleHighlight = (id) => {
        if(highlightedObjectId === id) {
            addHighlightedObjectId(null)
            return
        }
        addHighlightedObjectId(id)
    }

    const isActive = () => {
        return highlightedObjectId === id
    }

    return (
        <span
            className={`${isActive() ? 'bg-lime-800' : 'hover:bg-lime-600'} text-left rounded p-1 cursor-pointer`}
            onClick={() => handleHighlight(id)}
        >{ displayName }</span>
    )
}