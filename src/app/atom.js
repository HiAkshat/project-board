import initialProjectData from "@/data/initialData"
import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const projectAtom = atom(initialProjectData)
// export const addNote = atom((note, colId, pr))