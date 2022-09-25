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
function calculateAverage(ages) {
  const age = ages.reduce((prev, next) => prev + next, 0);

  return age / ages.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlymen = people.filter(person => (
    (century)
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  ));

  const age = onlymen.map(man => man.died - man.born);

  return calculateAverage(age);
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
  const onlyWomen = people.filter(person => person.sex === 'f');
  const womenWithCh = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => person.name === child.mother)) : onlyWomen;
  const age = womenWithCh.map(woman => woman.died - woman.born);

  return calculateAverage(age);
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
  const children = people.filter(child => (
    people.some(person => (
      (onlyWithSon)
        ? child.sex === 'm' && child.mother === person.name
        : child.mother === person.name
    ))));

  const agesDiff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverage(agesDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
