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
function calculateMenAverageAge(people, century) {
  let sumOfAges = 0;
  let countOfMens = 0;

  people.forEach(human => {
    const ifCentury = (Math.ceil(human.died / 100) === century || !century);
    const menAge = human.sex === 'm' && ifCentury ? human.died - human.born : 0;

    sumOfAges += menAge;
    countOfMens = menAge !== 0 ? countOfMens + 1 : countOfMens;
  });

  return sumOfAges / countOfMens;
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
  let sumOfAges = 0;
  let countOfWomen = 0;

  people.forEach((human, i, arr) => {
    const isMother = !withChildren
    || arr.some(child => human.name === child.mother);
    const womenAge = human.sex === 'f'
    && isMother ? human.died - human.born : 0;

    sumOfAges += womenAge;
    countOfWomen = womenAge !== 0 ? countOfWomen + 1 : countOfWomen;
  });

  return sumOfAges / countOfWomen;
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
  let sumOfDiferences = 0;
  let countOfChildren = 0;

  people.forEach((child, i, arr) => {
    const Mother = onlyWithSon
      ? arr.find(mom => child.mother === mom.name && child.sex === 'm')
      : arr.find(mom => child.mother === mom.name);
    const difference = Mother ? child.born - Mother.born : 0;

    sumOfDiferences += difference;
    countOfChildren = difference !== 0 ? countOfChildren + 1 : countOfChildren;
  });

  return sumOfDiferences / countOfChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
