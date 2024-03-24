import initialProjectData from "@/data/initialData"
import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const projectAtom = atomWithStorage("todo", initialProjectData)
export const statusEditVisibleAtom = atom(false)
export const statusEditAtom = atom("")

export const draggedOverAtom = atom("")
// export const addNote = atom((note, colId, pr))