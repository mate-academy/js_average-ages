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
  const men = filterPeopleBySex(people, 'm');

  const foundMan = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return calculateAverageAge(foundMan);
}

const filterPeopleBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const women = filterPeopleBySex(people, 'f');

  const foundWomen = withChildren
    ? women
      .filter(woman => people
        .find(person => woman.name === person.mother))
    : women;

  return calculateAverageAge(foundWomen);
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
  const children = people.filter(child => people.find(
    person => person.name === child.mother));

  const foundChildren = onlyWithSon
    ? filterPeopleBySex(children, 'm')
    : children;

  const ageDifference = foundChildren.reduce(
    (sum, child) => sum + child.born - people.find(
      person => person.name === child.mother).born, 0)
    / foundChildren.length;

  return ageDifference;
}

const calculateAverageAge = (people) => {
  return people.reduce(
    (sum, person) => ((person.died - person.born) + sum), 0)
    / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
