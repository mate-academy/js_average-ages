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
  const arrayOfMen = century
    ? people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const menAges = arrayOfMen.map(man => man.died - man.born);

  return getAverage(menAges);
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
  const arrayOfWomen = withChildren
    ? people.filter(woman => woman.sex === 'f'
    && people.find(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const womenAge = arrayOfWomen.map(woman => woman.died - woman.born);

  return getAverage(womenAge);
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
  const arrayOfChildren = onlyWithSon
    ? people.filter(person => person.mother
      && person.sex === 'm' && people.find(mom => mom.name === person.mother))
    : people.filter(person => person.mother
      && people.find(mom => mom.name === person.mother));

  const ageDifference = arrayOfChildren
    .map(person => {
      const mother = people.find(mom => mom.name === person.mother);
      const diff = person.born - mother.born;

      return diff;
    });

  return getAverage(ageDifference);
}

function getAverage(people) {
  return people.reduce((acc, element) => acc + element) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
