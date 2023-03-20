import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

async function getDataArray(email, currentDate, range, field){
    // Pull relevant references from firestore
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    let mealData = await userData.mealList;

    // initialise date bound variables
    const upperBound = new Date(currentDate);
    let lowerBound = new Date(upperBound);
    lowerBound.setDate(lowerBound.getDate() - range);

    // intialise food object storage
    let indexedFoodObjectList = [[]];
    for(let i = 0; i < range - 1; i++){
        indexedFoodObjectList.push([]);
    }

    // push food objects to their relevant day (indexed by days from lowerBound)
    for(let i = 0; i < mealData.length; i++){
        const thisDate = new Date(mealData[i]["metaData"]["date"])
        if(lowerBound < thisDate && thisDate <= upperBound){
            // the index is how many from the lowerbound we find this date
            let index = ((thisDate - lowerBound) / (1000 * 60 * 60 * 24));

            indexedFoodObjectList[index].push(mealData[i]["meal"])
        }
    }

    // put the sum the selected nutrient field in retVals (stored in field)
    let retVals = [];
    let printDate = new Date(lowerBound);
    //for each day
    for(let i = 0; i < indexedFoodObjectList.length; i++){
        retVals[i] = 0;
        // for each meal
        for(let j = 0; j < indexedFoodObjectList[i].length; j++){
            // if field here does not represent a valid field in the food object it will explode hehe

            //for each foodObject, inside each meal, inside each day.

            for(let k = 0; k < indexedFoodObjectList[i][j].length; k++){ 
                retVals[i] += (
                    indexedFoodObjectList[i][j][k]["foodObject"][field]
                    * (indexedFoodObjectList[i][j][k]["weight"]/100)
                );
            }
        }
    }
    return retVals;
}

export { getDataArray }
