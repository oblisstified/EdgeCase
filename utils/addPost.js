import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite';

async function savePost(email, postBody) {

    const dateString = (new Date(Date.now())).toDateString();

    try {
        // pull the relevant references from database
        let userRef = doc(db, 'users', email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        let newPostList = await userData.postList; // pull list of posts from users

        console.log("not dead yet")

        // add our object to the reference for postList
        newPostList.push({
            post : saveObject
        });

        // send the updated information
        await updateDoc(userRef, {postList:newPostList})
            .then(() => {return true;})
      } 
      catch (error) {
        console.error(error);
        return false;
      }
}

async function createPost(saveObject, presetName){
    const  dateString = (new Date(Date.now())).toDateString();

    const metaDataObject = {
        date: dateString,
        presetName: presetName
    }

    try{
        // pull relevant references
        let presetRef = doc(db, 'presets', "presetList");
        const presetSnapshot = await getDoc(presetRef);
        const data = presetSnapshot.data();
        let newPresets = await data.presets;

        if(newPresets == undefined){
            newPresets = []
        }

        newPresets.push({
            preset : saveObject,
            metaData: metaDataObject
        });

        await updateDoc(presetRef, {presets:newPresets})
        .then(() => {return true;})

    } catch (error){
        console.log(error)
        return false;
    }

}

export { saveMeal, createPreset }