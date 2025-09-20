import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from '../components/RateLimitedUI'
import NotesNotFound from "../components/NotesNotFound";
import api from '../lib/axios';
import {toast} from 'react-hot-toast'
import axios from "axios";
import NoteCard from "../components/NoteCard";


const Home = () => {
  const [isRateLimited,setiSRateLimited]= useState(false)
  const [notes,setNotes]= useState([]);
  const [loading,setLoading]= useState(true);
  useEffect(()=> {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setiSRateLimited(false)
      } catch (error) {
        if(error.response.status===429) {
          setiSRateLimited(true)
        }
        else {
          toast.error("Failed to load notes")
        }
        
        console.log("Error in fetching notes", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes();
  },[])
  return (
    <div className="min-h-screen">
      <Navbar/>
    {isRateLimited && <RateLimitedUI/>}
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {notes.length===0 && <NotesNotFound/>}
      {!isRateLimited && notes.length>0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note)=> (
            <div>
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Home