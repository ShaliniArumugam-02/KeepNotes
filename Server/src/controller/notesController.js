
import Note from "../model/Note.js";

const getAllNotes = async (_,res) => {
    try {
     const notes = await Note.find().sort({createdAt:-1})
     res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in getAllNotes",error)
    }
}
const getNoteById = async (req,res) => {
    try {
   const note = await Note.findById(req.params.id)
   if(!note) return res.status(404).json({message: "Note not found"})
    res.json(note)
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in getNoteById",error)
    }
}
const createNote = async (req,res)=>{
    try {
        const {title,content} = req.body
        const newNote = new Note( {title,content})
        const savedNote =  await newNote.save()
        res.status(201).json(savedNote)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in createNote",error)
    }
}
const updateNote = async (req,res)=> {
    try {
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new:true})
        if(!updateNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)
    } catch (error) {
         res.status(500).json({message:"Internal server error"})
        console.log("error in updateNote",error)
    }
}
const deleteNote = async (req,res) => {
    try { 
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote) return res.status(404).json({message: "Note not found"})
            res.status(200).json(deleteNote)
    } catch (error) {
         res.status(500).json({message:"Internal server error"})
        console.log("error in deleteNote",error)
    }
}

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };