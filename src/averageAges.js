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
  let onlyMen = people.filter((person) => person.sex === 'm');

  function filterByCentury(man) {
    return Math.ceil(man.died / 100) === century;
  }

  if (century) {
    const menFilteredByCentury = onlyMen.filter(filterByCentury);

    onlyMen = menFilteredByCentury;
  }

  const onlyAge = onlyMen.map((man) => man.died - man.born);
  const sumOfAge = onlyAge.reduce((sum, age) => sum + age, 0);
  const averageMenAge = sumOfAge / onlyAge.length;

  return averageMenAge;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const onlyWomen = people.filter(woman => withChildren ? woman.sex === 'f'
  && people.some(person => person.mother === woman.name) : woman.sex === 'f');

  const onlyAge = onlyWomen.map((woman) => woman.died - woman.born);
  const sumOfAge = onlyAge.reduce((sum, age) => sum + age, 0);
  const averageWomenAge = sumOfAge / onlyAge.length;

  return averageWomenAge;
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
  const children = people.filter(child => onlyWithSon ? child.sex === 'm'
  && people.some(person => person.name === child.mother)
    : people.some(person => person.name === child.mother));

  const onlyAge = children.map(child => child.born
    - people.find(mother => child.mother === mother.name).born);
  const sumOfAge = onlyAge.reduce((sum, age) => sum + age, 0);
  const averageWomenAge = sumOfAge / onlyAge.length;

  return averageWomenAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
