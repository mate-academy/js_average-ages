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
function averageCalc(sum, list) {
  return (Math.ceil(sum / list.length * 1000) / 1000);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const manFiltered = century
    ? people.filter(human => (
      human.sex === 'm' && Math.ceil(human.died / 100) === century
    ))
    : people.filter(human => human.sex === 'm');

  const manAge = manFiltered.map(human => human.died - human.born)
    .reduce((sum, current) => sum + current, 0);

  return averageCalc(manAge, manFiltered);
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
  const motherList
  = people.filter(human => human.mother).map(human => human.mother);

  const womanList = withChildren
    ? people.filter((human) => (
      human.sex === 'f' && motherList.includes(human.name)
    ))
    : people.filter(human => human.sex === 'f');

  const womanAge = womanList.map(human => human.died - human.born)
    .reduce((sum, current) => sum + current, 0);

  return averageCalc(womanAge, womanList);
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
  const ageList = onlyWithSon
    ? (people.filter(human =>
      human.sex === 'm' && people.find(mother => human.mother === mother.name)
    ))
    : people.filter(
      human => people.find(mother => human.mother === mother.name));

  const sumAgeDiff = ageList.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  ).reduce((sum, current) => sum + current, 0);

  return averageCalc(sumAgeDiff, ageList);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
