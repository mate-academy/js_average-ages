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
  // const MEN = people.filter(person => century
  //   ? person.sex === 'm' && Math.ceil(person.died / 100) === century
  //   : person.sex === 'm'
  // );

  const MEN = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const MEN_AGES = MEN
    .reduce((total, person) => total + person.died - person.born, 0);

  const AVARAGE_AGE = MEN_AGES / MEN.length.toFixed(2);

  return AVARAGE_AGE;
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
  const WEMEN = withChildren
    ? people
      .filter((person, i, persons) => person.sex === 'f'
        && persons
          .some(p => p.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const WEMEN_AGES = WEMEN
    .reduce((total, ages) => total + ages.died - ages.born, 0);
  const AVARAGE_AGE = WEMEN_AGES / WEMEN.length.toFixed(2);

  return AVARAGE_AGE;
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
  const CHILDREN = onlyWithSon
    ? people
      .filter((person, i, persons) => persons
        .some(item => item.name === person.mother
          && person.sex === 'm'))
    : people
      .filter((person, i, persons) => persons
        .some(item => item.name === person.mother));
  const CHILDREN_AGE = CHILDREN
    .reduce((total, child) => total + child.born
      - people[people.findIndex(item => item.name === child.mother)].born,
    0);
  const AVARAGE = CHILDREN_AGE / CHILDREN.length.toFixed(2);

  return AVARAGE;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
