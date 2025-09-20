import mongoose from "mongoose"
 
const noteSchema= new mongoose.Schema( {
    title:{
        type:String,
        requird:true,
    },
    content: {
        type:String,
        required:true,
    },
}, {timestamps:true} )

// model

const Note = mongoose.model("Note", noteSchema) 

export default Note;
