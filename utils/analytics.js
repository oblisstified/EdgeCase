import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

async function getDataArray(email, currentDate /*start*/, range /*how many days back */, field){
    // Pull relevant references from firestore
    let userRef = await doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = await userSnapshot.data();
    let mealData = await userData.mealList;

    if(mealData == undefined) mealData = []

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
    const userDataObj = await userSnapshot.data();

    const goal = userDataObj.goal;
    const height = userDataObj.height;
    const weight = userDataObj.weight;
    const age = userDataObj.age;
    const gender = userDataObj.gender;

    console.log("before")
    if(!goal | !height | !weight | !age | !gender) return 2500 ;
    console.log("after")

    let dailyCalories;
    if(gender=="M"){
        dailyCalories = 665 + (9.6 * weight) + (180 * height) - (4.7 * age);
    } else {
        dailyCalories = 66 + (13.7 * weight) + (500 * height) - (6.8 * age);
    }

    if(goal == "Gain Weight"){
        dailyCalories += 200;
    } else {
        dailyCalories -= 200;
    }

    return dailyCalories
}

async function getMacroObject(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userDataObj = await userSnapshot.data();

    let macroObject = JSON.parse(`
        {"Calories": 0,
        "Carbohydrate": 0,
        "Fiber": 0,
        "Monounsaturated Fat": 0,
        "Polyunsaturated Fats": 0,
        "Protein": 0,
        "Saturated Fat": 0,
        "Sugar": 0}
    `)

    const mealList = userDataObj.mealList == undefined ? [] : userDataObj.mealList;

    const todaysDate = (new Date(Date.now())).toDateString();
    let todaysMeals=[];

    for(let i = 0; i < mealList.length; i++){
        const thisDateString = (new Date(mealList[i]["metaData"]["date"])).toDateString();
        if(thisDateString == todaysDate){
            todaysMeals.push(mealList[i]["meal"]);
        }
    }

    //  for each meal
    for(let i = 0; i < todaysMeals.length; i++){
        // for each foodobject in each meal
        for(let j = 0; j < todaysMeals[i].length; j++){
            macroObject["Calories"] += todaysMeals[i][j]["foodObject"]["Calories"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Carbohydrate"] += todaysMeals[i][j]["foodObject"]["Carbohydrate"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Fiber"] += todaysMeals[i][j]["foodObject"]["Fiber"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Monounsaturated Fat"] += todaysMeals[i][j]["foodObject"]["Monounsaturated Fat"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Polyunsaturated Fats"] += todaysMeals[i][j]["foodObject"]["Polyunsaturated Fats"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Protein"] += todaysMeals[i][j]["foodObject"]["Protein"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Saturated Fat"] += todaysMeals[i][j]["foodObject"]["Saturated Fat"] * (todaysMeals[i][j]["weight"]/100)
            macroObject["Sugar"] += todaysMeals[i][j]["foodObject"]["Sugar"] * (todaysMeals[i][j]["weight"]/100)
        }
    }

    return macroObject
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

async function getTodaysCalories(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    const mealList = userData.mealList == undefined ? [] : userData.mealList;

    const todaysDate = (new Date(Date.now())).toDateString();
    let todaysMeals=[];

    for(let i = 0; i < mealList.length; i++){
        const thisDateString = (new Date(mealList[i]["metaData"]["date"])).toDateString();
        if(thisDateString == todaysDate){
            todaysMeals.push(meaList[i]);
        }
    }

    let todaysCalories = 0;
    //  for each meal
    for(let i = 0; i < todaysMeals.length; i++){
        // for each foodobject in each meal
        for(let j = 0; j < todaysMeals[i].length; j++){
            todaysCalories += todaysMeals[i][j]["foodObject"]["Calories"] * (todaysMeals[i][j]["weight"]/100)
        }
    }

    return todaysCalories;
}

/*
*@param email address of the user to 
*/
async function getUserProgress(email){
    let userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    let todayDate = new Date(Date.now());

    

    // collect information relevant to challenges
    const numFriends = userData.friends == undefined ? 0:userData.friends.length;
    const numSavedRecipes = userData.numSavedRecipies;
    const todaysCalories = getTodaysCalories(email);
    console.log(numSavedRecipes)

    let challengeCompletion = 0;
    // compare with challenge threshholds
    if(numSavedRecipes >= 3) challengeCompletion++; 
    if(numSavedRecipes >= 10) challengeCompletion++; 
    if(numSavedRecipes >= 25) challengeCompletion++;

    if(numFriends >= 1) challengeCompletion++;
    if(numFriends >= 5) challengeCompletion++;
    if(numFriends >= 25) challengeCompletion++;
    
    console.log("comp" + challengeCompletion)
    return (challengeCompletion/9)

}

export { getDataArray, getCalorieGoal, daysCalorieGoalMet, getSavedPresets, getMacroObject, getUserProgress, getTodaysCalories }
