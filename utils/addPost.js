import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite';

async function savePost(email, postBody) {

    try {
        // pull the relevant references from database
        let userRef = doc(db, 'posts', "postList");
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data().posts;
        let newPostList = await userData.postList; // pull list of posts from users

        if(newPostList==undefined) {
            newPostList = [];
        }

        console.log("not dead yet")

        // add our object to the reference for postList
        newPostList.push({
            postList : saveObject
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

async function createPost(saveObject){

    const  dateString = (new Date(Date.now())).toDateString();

    try{
        // pull relevant references
        let postRef = doc(db, 'posts', "postList");
        const postSnapshot = await getDoc(postRef);
        const data = postSnapshot.data();
        let newPosts = await data.post;

        if(newPosts == undefined){
            newPosts = []
        }

        newPosts.push({
            post : saveObject,
        });

        await updateDoc(postRef, {post:newPosts})
        .then(() => {return true;})

    } catch (error){
        console.log(error)
        return false;
    }

}

export { savePost, createPost }