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

function getAverage(totalAgeSum, length) {
  return +(totalAgeSum / length).toFixed(2);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredPeople = people.filter(human =>
    century !== undefined
      ? human.sex === 'm' && century === Math.ceil(human.died / 100)
      : human.sex === 'm');

  ;

  const totalAgeCentury = filteredPeople.reduce(
    (a, b) => a + (b.died - b.born), 0
  );

  return getAverage(totalAgeCentury, filteredPeople.length);
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
  const filteredPeople = people.filter(human => people.find(mother =>
    withChildren === true
      ? human.name === mother.mother
      : human.sex === 'f'
  )
  );

  const totalAgeSum = filteredPeople.reduce((a, b) => a + (b.died - b.born), 0);

  return getAverage(totalAgeSum, filteredPeople.length);
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
  const womenMess = people.map(woman => woman.sex === 'f' ? woman : 0);

  const women = womenMess.filter(woman => woman !== 0);

  const children = people.filter(
    child => women.find(mother => onlyWithSon === true
      ? mother.name === child.mother && child.sex === 'm'
      : mother.name === child.mother
    )
  );

  const mothers = women.filter(
    woman => children.find(child => woman.name === child.mother)
  );

  const differenceArray = children.map(
    child => child.born - mothers.find(
      mother => child.mother === mother.name).born);

  const totalDifference = differenceArray.reduce((a, b) => a + b, 0);

  return getAverage(totalDifference, differenceArray.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
