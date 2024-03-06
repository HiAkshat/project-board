import initialProjectData from "@/data/initialData"
import {atom} from "jotai"

export const projectAtom = atom(initialProjectData)
// export const addNote = atom((note, colId, pr))