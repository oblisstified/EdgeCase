import { descriptions } from "../resources/foodIndexes"
import { getDescription } from "../resources/foodDetails"

import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

// case insensetive regex match for the start of food descriptions
function findFoodObjects(food_search){
    let indexList = [];
    let foodObjectList=[]

    var strRegExPattern = '^'+food_search+'.*'; 
    var re = new RegExp(strRegExPattern, 'i');

    for(let i = 0; i < descriptions.length; i++){
        if(re.test(descriptions[i])){
            indexList.push(i)
        }
    }

    for(let i = 0; i < indexList.length; i++){
        foodObjectList.push(getDescription(indexList[i]))
    }

    return foodObjectList
}

async function findPresetObjects(food_search){
    let matches = []

    try {
        let userRef = doc(db, 'presets', "presetList");
        let presetList = await getDoc(userRef);
        let presetData = presetList.data().presets;

        var strRegExPattern = '^'+food_search+'.*'; 
        var re = new RegExp(strRegExPattern, 'i');

        for(let i = 0; i < presetData.length; i++){
            const matchStr = presetData[i]["metaData"]["presetName"]
            if(re.test(matchStr)){
                matches.push(presetData[i])
            }
        }

    } catch (error) {
        console.log(error)
    }
    return matches;
    
}

export { findFoodObjects, findPresetObjects }