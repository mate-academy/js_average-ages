'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 */

/**  Моя вспомогательная функция для задач 1, 2, чтобы не повторять код
 * Возвращает средний возраст людей из переданного массива
*/
function averageAge(arr) {
  const peopleAges = arr.map(human => human['died'] - human['born']);
  const averageAge = peopleAges.reduce((sum, current) => sum + current) / arr.length;

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMenArr = people.filter(human => human['sex'] === 'm');

  return !century
    ? averageAge(onlyMenArr)
    : averageAge(onlyMenArr.filter(man => Math.ceil(man['died'] / 100) === century));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomenArr = people.filter(human => human['sex'] === 'f');

  return !withChildren
    ? averageAge(onlyWomenArr)
    : averageAge(onlyWomenArr.filter(woman => people.some(child => child['mother'] === woman['name'])));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const onlyWomenArr = people.filter(human => human['sex'] === 'f');
  const mothersArr = onlyWomenArr.filter(woman => people.some(child => child['mother'] === woman['name']));
  const childrensArr = people.filter(child => mothersArr.some(woman => child['mother'] === woman['name']));
  const differencesChildArr = [];
  const differencesSonArr = [];

  for (let i = 0; i < childrensArr.length; i++) {
    for (let j = 0; j < mothersArr.length; j++) {
      if (mothersArr[j]['name'] === childrensArr[i]['mother']) {
        if (childrensArr[i]['sex'] === 'm') {
          differencesSonArr.push(childrensArr[i]['born'] - mothersArr[j]['born']);
        }
        differencesChildArr.push(childrensArr[i]['born'] - mothersArr[j]['born']);
      }
    }
  }

  return !onlyWithSon
    ? differencesChildArr.reduce((sum, current) => sum + current) / differencesChildArr.length
    : differencesSonArr.reduce((sum, current) => sum + current) / differencesSonArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
