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
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function avereageAge(peopleArray, ageArray) {
  const sumAge = ageArray.reduce((x, sum) => x + sum);
  const resAverageAge = sumAge / peopleArray.length;

  return resAverageAge;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const mansArray = people.filter(x => x.sex === 'm');
  const mansArrayRes = arguments.length === 1
    ? mansArray
    : mansArray.filter(x =>
      Math.ceil(x.died / 100) === century);
  const ageArray = mansArrayRes.map((x) => x.died - x.born);
  const resAverage = avereageAge(mansArrayRes, ageArray);

  return resAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const womanArray = people.filter(x => x.sex === 'f');

  const womanArrayRes = arguments.length === 1
    ? womanArray : womanArray.filter(x => people.find(y =>
      y.mother === x.name));

  const ageArray = womanArrayRes.map((x) => x.died - x.born);
  const resAverage = avereageAge(womanArrayRes, ageArray);

  return resAverage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here

  const peopleWithInfoAboutMothers = people.filter(x => people.find(y =>
    y.name === x.mother));

  const ageWhichMotherGaveBirth = peopleWithInfoAboutMothers.map(x =>
    x.born - people.find(y => y.name === x.mother).born);

  const sonsWithInfoAboutMothers = peopleWithInfoAboutMothers.filter(s =>
    s.sex === 'm');

  const ageWhichMotherGaveBirthSon = sonsWithInfoAboutMothers.map(
    x => x.born - people.find(y =>
      y.name === x.mother).born);

  const ageWhichMotherGaveBirthRes = arguments.length === 1
    ? ageWhichMotherGaveBirth : ageWhichMotherGaveBirthSon;

  const resAverage = avereageAge(ageWhichMotherGaveBirthRes,
    ageWhichMotherGaveBirthRes);

  return resAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
