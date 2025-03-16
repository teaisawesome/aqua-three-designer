import {Move3d, Rotate3d, Scale3d} from "lucide-react";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function TransformControlModeSelector(props) {
    const transformControlMode = useStudioStore((state) => state.transformControlMode)
    const setTransformControlMode = useStudioStore((state) => state.setTransformControlMode)

    return (
        <div className={'absolute top-4 right-4'}>
            <div className={'bg-sky-800 rounded-xl p-3.5 flex flex-col gap-4 text-white'}>
                <Move3d className={`${transformControlMode === 'translate' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                        onClick={() => setTransformControlMode('translate')}/>
                <Rotate3d className={`${transformControlMode === 'rotate' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                          onClick={() => setTransformControlMode('rotate')}/>
                <Scale3d className={`${transformControlMode === 'scale' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                         onClick={() => setTransformControlMode('scale')}/>
            </div>
        </div>
    )
}