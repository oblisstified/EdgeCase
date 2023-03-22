import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';
/**
 * 
 * @param {*} saveObject the meal being added to the mealList
 * ===============================
 * MealList is a list of all saveObjects'/mealObjects (used interchangably) ever eaten by the user
 * SaveObject structure:
 * {
 *  meal: [{
 *      foodObject: {
                Decription: "Ingredient 1",
                Calories: 0,
                ect....
*           },
        weight: 12                
 *      },
 *      {foodObject: {
                Decription: "Ingredient 2",
                Calories: 0,
                ect....
*           },
        weight: 12  
        }   
 *      metaData: {
 *          date:
 *          isPreset:
 *          presetName:
 *      }
    ]
 *  
 * }
 * meal is a list of foodobject-weight tuples, and a metadata object
 * the field in the user Doc in firestore is called mealList, and contains a list of meals
 * 
 * @param {*} email the email of the user to which this meal should be saved
 * @param {*} isPreset whether the meal being saved is from the preset page (useful for normalising the object structure)
 * @returns  bool, whether the save completed successfully or not
 * NB: if this function returns false, the console should have an error printed.
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

        if(newMealList==undefined) newMealList = []


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


async function incrementSavedPresets(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    let numSaved = await userData.numPresetsSaved;

    if(numSaved == undefined){
        numSaved = 0;
    }

    numPresetsSaved++;
    await updateDoc(userRef, {numPresetsSaved:numSaved})
            .then(() => {return true;})
}


async function createPreset(saveObject, presetName, email){
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

        let userRef = doc(db, 'users', email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();


        let numSavedRecipies = await userData.numSavedRecipies;
        if(numSavedRecipies == undefined){
            setDoc(userRef, {numSavedRecipies: 1})
            console.log("undefined")
        } else {
            console.log(numSavedRecipies)
            numSavedRecipies++;
            console.log("after" + numSavedRecipies)
            updateDoc(userRef, {numSavedRecipies: numSavedRecipies})
        }

        if(newPresets == undefined){
            newPresets = []
        }

        newPresets.push({
            preset : saveObject,
            metaData: metaDataObject
        });

        await updateDoc(presetRef, {presets:newPresets})
        .then(() => {incrementSavedPresets(email)})

    } catch (error){
        console.log(error)
        return false;
    }

}

export { saveMeal, createPreset }