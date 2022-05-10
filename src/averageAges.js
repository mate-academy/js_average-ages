'use strict';

const findAge = person => person.died - person.born;

const findAverage = ages => Math.round(ages.reduce((age1, age2) =>
  age1 + age2) / ages.length * 100) / 100;

const findMale = (person) => person.sex === 'm';

const findFemale = (person) => person.sex === 'f';

const findMother = (child, mother) =>
  child.mother === mother.name;

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
  const men = people.filter(person => findMale(person));
  let menAges = 0;

  if (century !== undefined) {
    menAges = men.filter(person =>
      Math.ceil(person.died / 100) === century).map(findAge);
  } else {
    menAges = men.map(findAge);
  }

  return findAverage(menAges);
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
  const women = people.filter(person => findFemale(person));
  let womenAges = 0;

  const womenWithChildren = people.filter(mother =>
    people.find(child => findMother(child, mother)));

  if (withChildren !== undefined) {
    womenAges = womenWithChildren.map(findAge);
  } else {
    womenAges = women.map(findAge);
  }

  return findAverage(womenAges);
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
  const womenWithChildren = onlyWithSon
    ? people.filter(person =>
      people.find(child =>
        findMother(child, person)
        && findMale(child)))
    : people.filter(person =>
      people.find(child =>
        findMother(child, person)));

  const childrenWithMom = onlyWithSon
    ? people.filter(person =>
      people.find(mom =>
        findMother(person, mom)
        && findMale(person)))
    : people.filter(person =>
      people.find(mom =>
        findMother(person, mom)));

  const momAgeDiff = childrenWithMom.map(child =>
    child.born - womenWithChildren.find(mom =>
      findMother(child, mom)).born);

  return findAverage(momAgeDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
