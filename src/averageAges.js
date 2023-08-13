'use strict';

const MALE = 'm';
const FEMALE = 'f';
const CENTURY = 100;

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
  const malePeople = people.filter(person =>
    person.sex === MALE
    && (century === undefined
    || century === Math.ceil(person.died / CENTURY)));

  const menAgesSum = malePeople.reduce((total, person) =>
    total + (person.died - person.born), 0);

  const menAverageAge = menAgesSum / malePeople.length;

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
  let femalePeople = people.filter(person => person.sex === FEMALE);

  if (withChildren) {
    femalePeople = femalePeople.filter(mother =>
      people.some(person => person.mother === mother.name));
  }

  const womenAgesSum = femalePeople.reduce((total, person) =>
    total + (person.died - person.born), 0);

  const womenAverageAge = womenAgesSum / femalePeople.length;

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const mothersOfPeople
    = people.filter(person =>
      people.some(child =>
        child.mother === person.name));

  let childrenWithMother
    = people.filter(child =>
      mothersOfPeople.some(person => person.name === child.mother));

  if (onlyWithSon) {
    childrenWithMother = childrenWithMother.filter(person =>
      person.sex === MALE);
  }

  const ageDifferenceSum = childrenWithMother.reduce((differenceSum, child) => {
    const mother = mothersOfPeople.find(person => person.name === child.mother);

    const ageDifference = child.born - mother.born;

    return differenceSum + ageDifference;
  }, 0);

  return ageDifferenceSum / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
