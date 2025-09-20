import { LoaderIcon, ArrowLeftIcon, TrashIcon } from "lucide-react";
import  { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios";

const NoteDetail = () => {
  const [note,setNote]= useState(null);
  const[loading,setLoading]=useState(true);
  const[saving,setsaving]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("error in fetching note:", error)
    toast.error("Failed to fetch note")
      } finally{
        setLoading(false)
      }
    }
    fetchNote()
  },[id])
  if(loading) {
    return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10"/>
    </div>
    )
  }
  const handleDelete = async()=>{
    if(!window.confirm("Are you sure you want to delete this note"))return;
    try {
      await api.delete(`/notes/${id}`)
    toast.success("Note deleted")
    navigate("/")
    } catch (error) {
      console.log("error in deleteing the note", error)
  toast.error("failed to delete the note");
    }
    
  }
  const handleSave = async()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content")
    }
    setsaving(true)
    try {
       await api.put(`notes/${id}`, note)
    toast.success("Note updated successfully")
    navigate("/")
    } catch (error) {
      console.log("Error saving the note:", error)
    toast.error("Failed to update note");
    } finally {
      setsaving(false)
    }
   
  }
  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between"> 
              <Link className="btn btn-ghost" to={"/"}> <ArrowLeftIcon className="size-5"/> Back to Note</Link> 
          <button onClick={handleDelete} className="btn btn-error btn-outline"> <TrashIcon className="size-5"/>Delete Note</button>

            </div>
              <div className="card bg-base-100">
                <div className="card-body">
                   <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                placeholder="Note Title"
                className="input input-bordered"
                value={note.title}
                onChange={(e)=> setNote({...note,title:e.target.value})}
                 type="text" />
              </div>

                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                placeholder="write your note here..."
                className="textarea textarea-bordered h-32"
                value={note.content}
                onChange={(e)=> setNote({...note,content:e.target.value})}
                 type="text" />
            
                  </div>
                   <div className="cars-actions justify-end">
                    <button className="btn btn-primary" disabled={saving} onClick={handleSave}> {saving? "saving...": "save Changes"}</button>

                   </div>
                </div>

              </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NoteDetail