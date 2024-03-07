import initialProjectData from "@/data/initialData"
import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const projectAtom = atomWithStorage("todo", initialProjectData)
// export const addNote = atom((note, colId, pr))