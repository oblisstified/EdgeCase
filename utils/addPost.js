import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

async function createPost(email, postBody) {

    const dateString = (new Date(Date.now())).toDateString();

    
}