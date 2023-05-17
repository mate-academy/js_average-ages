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
  let menOnly = people.filter(person => person.sex === 'm');

  menOnly = century
    ? menOnly.filter(person => Math.ceil(person.died / 100) === century)
    : menOnly;

  menOnly.map(function(person) {
    person.age = person.died - person.born;
  });

  const menAverageAge = menOnly
    .map(a => a.age).reduce((a, b) => a + b) / menOnly.length;

  return menAverageAge;
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
  let womenOnly = people.filter(person => person.sex === 'f');

  womenOnly.map(function(person) {
    person.age = person.died - person.born;
  });

  const mothers = people.map(person => person.mother);

  womenOnly = withChildren
    ? womenOnly.filter(person => mothers.includes(person.name))
    : womenOnly;

  const womenAverageAge = womenOnly
    .map(a => a.age).reduce((a, b) => a + b) / womenOnly.length;

  return womenAverageAge;
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
  const allMothersNames = people.map(person => person.mother);
  const listedMothers = people.filter(person =>
    allMothersNames.includes(person.name));
  const listedMothersNames = listedMothers.map(person => person.name);
  let children = people.filter(person =>
    listedMothersNames.includes(person.mother));

  children.map(child => {
    const mother = listedMothers.find(person => person.name === child.mother);

    if (mother.name === child.mother) {
      child.motherBorn = mother.born;
    }

    return child;
  });

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const diff = children.map(child => child.born - child.motherBorn);

  return diff.reduce((a, b) => a + b) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
