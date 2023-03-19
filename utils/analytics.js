import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

async function getDataArray(email, currentDate /*start*/, range /*how many days back */, field){
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

    if(mealData == undefined){
        mealData = []
    }

    // push food objects to their relevant day (indexed by days from lowerBound)
    for(let i = 0; i < mealData.length; i++){
        const thisDate = new Date(mealData[i]["metaData"]["date"])
        if(lowerBound <= thisDate && thisDate < upperBound){
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

async function getCalorieGoal(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    const userDataObj = await userData;

    const goal = userDataObj.goal;
    const height = userDataObj.height;
    const weight = userDataObj.weight;
    const age = userDataObj.age;
    const gender = userDataObj.gender;

    let dailyCalories;
    if(gender=="M"){
        dailyCalories = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    } else {
        dailyCalories = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    }

    if(goal == "Gain Weight"){
        dailyCalories += 200;
    } else {
        dailyCalories -= 200;
    }

    return dailyCalories
}

async function daysCalorieGoalMet(email, dateRange){
    const today = (new Date(Date.now())).toDateString();
    const calorieValues = await getDataArray(email, today, dateRange, "Calories");
    const calorieGoal = await getCalorieGoal(email);

    let sum = 0;
    for(let i = 0; i < calorieValues.length; i++){
        // if the user is within 5% of their goal
        if(calorieGoal * 0.95 < calorieValues[i] && calorieGoal * 1.05 > calorieValues[i]){
            sum++;
        }
    }

    return sum;
}

async function getSavedPresets(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    let numSaved = await userData.numPresetsSaved;

    return (numSaved == undefined) ? 0 : numSaved;
}

export { getDataArray, getCalorieGoal, daysCalorieGoalMet, getSavedPresets }
