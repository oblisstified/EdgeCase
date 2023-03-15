import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

async function getDataArray(email, currentDate, range, field){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    let mealData = await userData.mealList;


    const upperBound = new Date(currentDate);

    let lowerBound = new Date(upperBound);
    lowerBound.setDate(lowerBound.getDate() - range);


    let indexedFoodObjectList = [[]];
    for(let i = 0; i < range - 1; i++){
        indexedFoodObjectList.push([]);
    }


    for(let i = 0; i < mealData.length; i++){
        const thisDate = new Date(mealData[i]["metaData"]["date"])
        if(lowerBound <= thisDate && thisDate < upperBound){
            // the index is how many from the lowerbound we find this date
            let index = ((thisDate - lowerBound) / (1000 * 60 * 60 * 24));

            indexedFoodObjectList[index].push(mealData[i]["meal"])
        }
    }


    let retVals = [];
    let printDate = new Date(lowerBound);
    for(let i = 0; i < indexedFoodObjectList.length; i++){
        retVals[i] = 0;
        for(let j = 0; j < indexedFoodObjectList[i].length; j++){
            retVals[i] += indexedFoodObjectList[i][j][0]["foodObject"][field];
        }
    }
    return retVals;
}

export { getDataArray }
