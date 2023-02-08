import { descriptions } from "../resources/foodIndexes"
import { getDescription } from "../resources/foodDetails"

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

export { findFoodObjects }