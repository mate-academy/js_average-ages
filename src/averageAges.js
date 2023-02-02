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
  let men = people.filter(({ sex }) => sex === 'm');

  century !== undefined && (
    men = men.filter(({ died }) => Math.ceil(died / 100) === century)
  );

  return calculateAverageAge(men);
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
  // write code here
  const motherNames = people.reduce((acc, { mother }) => [...acc, mother], []);
  let women = people.filter(({ sex }) => sex === 'f');

  withChildren && (
    women = women.filter(({ name }) => motherNames.includes(name))
  );

  return calculateAverageAge(women);
}

const calculateAverageAge = (arr) => {
  return arr.reduce((acc, { born, died }) => (
    acc + died - born
  ), 0) / arr.length;
};

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
  const names = people.reduce((acc, { name }) => (
    [...acc, name]
  ), []);

  let children = people.filter(({ mother }) => (
    mother && names.includes(mother)
  ));

  onlyWithSon && (
    children = people.filter(({ sex, mother }) => (
      mother && sex === 'm' && names.includes(mother)
    )));

  return children.reduce((acc, { born, mother }) => {
    const motherOfCurrent = people.find(({ name }) => name === mother);
    const motherAge = born - motherOfCurrent.born;

    return acc + motherAge;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
