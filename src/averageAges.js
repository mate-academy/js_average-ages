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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const arrayMen = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const arrayAges = arrayMen.map(item => item.died - item.born);
  const averageMenAge = arrayAges.reduce((sum, item) => sum + item, 0);

  return averageMenAge / arrayAges.length;
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
  const arrayWomen = withChildren
    ? people.filter(item => item.sex === 'f')
      .filter(mother => people.find(person => person.mother === mother.name))
    : people.filter(e => e.sex === 'f');

  const sumAges = arrayWomen.reduce((acc, e) => acc + e.died - e.born, 0);

  return sumAges / arrayWomen.length;
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
  const ages = [];

  onlyWithSon ? people.filter(person => person.sex === 'f')
    .map(mother => people.map(per => mother.name === per.mother
      && per.sex === 'm' ? ages.push(per.born - mother.born) : false))
    : people.filter(person => person.sex === 'f')
      .map(mother => people.map(per => mother.name === per.mother
        ? ages.push(per.born - mother.born) : false));

  const averageAge = ages.reduce((sum, age) => sum + age, 0);

  return averageAge / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
