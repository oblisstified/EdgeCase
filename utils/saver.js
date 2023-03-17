import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';
/**
 * 
 * @param {*} saveObject 
 * ===============================
 * MealList is a list of all saveObjects'/mealObjects (used interchangably) ever eaten by the user
 * SaveObject structure:
 * {
 *  meal: [{
 *      foodObject: {
                Decription: "Ingredient 2",
                Calories: 0,
                ect....
*           },
        weight: 12                
 *      },
 *      foodObject: {
                Decription: "Ingredient 1",
                Calories: 0,
                ect....
*           },
        weight: 12     
 * ]
 *  metaData: {
 *      date:
 *      isPreset:
 *      presetName:
 *  }
 * }
 * 
 * @param {*} email 
 * @param {*} isPreset 
 * @returns 
 */


async function saveMeal(saveObject, email, isPreset){
    console.log(saveObject)
    if(!saveObject || !email) return false;
    
    const  dateString = (new Date(Date.now())).toDateString();
    const presetName = isPreset ? saveObject["metaData"]["presetName"] : "";

    // unwrap the relevant info, if it is wrapped in a preset
    if(isPreset) {
        saveObject = saveObject.preset
    };

    const metaDataObject = {
        date: dateString,
        isPreset: isPreset,
        presetName: presetName
    }
    
    try {
        // pull the relevant references from database
        let userRef = doc(db, 'users', email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        let newMealList = await userData.mealList;

        console.log("not dead yet")

        // add our object to the reference for mealList
        newMealList.push({
            meal : saveObject,
            metaData : metaDataObject
        });

        // send the updated information
        await updateDoc(userRef, {mealList:newMealList})
            .then(() => {return true;})
      } 
      catch (error) {
        console.error(error);
        return false;
      }
    
}

async function createPreset(saveObject, presetName){
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