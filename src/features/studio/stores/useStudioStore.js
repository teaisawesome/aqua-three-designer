import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStudioStore = create(
    persist(
        (set) => ({
            usedComponents: [],
            addUsedComponent: (title) =>
                set((state) => ({
                    usedComponents: [...state.usedComponents, title],
                })),
        }),
        {
            name: 'studio-storage',
            getStorage: () => localStorage
        }
    )
)

export default useStudioStore