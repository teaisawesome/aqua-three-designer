import ToolBar from '../toolbar/Toolbar'
import MainCanvas from '../MainCanvas'
import PreferenceBar from '../preferencebar/PreferenceBar'


export default function DesktopLayout() {
    return (
        <div className="flex flex-row h-dvh">
            <ToolBar/>
            <MainCanvas />
            <PreferenceBar/>
        </div>
    )
}