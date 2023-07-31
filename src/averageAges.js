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
const isMan = (listOfPeople) =>
  listOfPeople.filter(person => person.sex === 'm');
const isWoman = (listOfPeople) =>
  listOfPeople.filter(person => person.sex === 'f');
const womanHasChildren = (listOfPeople, mother) =>
  listOfPeople.some(person => person.mother === mother);
const womenWithChildren = (listOfPeople) =>
  listOfPeople.filter(person => (womanHasChildren(listOfPeople, person.name)));
const peopleDiedInCentury = (listOfPeople, century) =>
  listOfPeople.filter(person =>
    (Math.ceil(person.died / 100)) === century);
const age = (listOfPeople) =>
  listOfPeople.map(person => person.died - person.born);
const peopleAverageAge = (ageWhenDied) =>
  +(((ageWhenDied.reduce((sum, number) =>
    sum + number, 0)) / ageWhenDied.length).toFixed(2));

function calculateMenAverageAge(people, century) {
  return century
    ? peopleAverageAge(age(peopleDiedInCentury(isMan(people), century)))
    : peopleAverageAge(age(isMan(people)));

  // write code heref
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
  return !withChildren
    ? peopleAverageAge(age(isWoman(people)))
    : peopleAverageAge(age(womenWithChildren(people)));
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
  const mothers = womenWithChildren(people);
  const childrenOfTheMothers = people.filter(person =>
    mothers.find(mother => mother.name === person.mother));
  const sonsOfTheMothers = isMan(childrenOfTheMothers);

  const ageDifference = childrenOfTheMothers.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  const ageDifferenceSon = sonsOfTheMothers.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  const ageDifferences = ageDifference.reduce((sum, number) =>
    (sum + number));

  const averageAgeDifferances
    = +(ageDifferences / childrenOfTheMothers.length).toFixed(2);

  const ageDifferencesSon
  = ageDifferenceSon.reduce((sum, number) => (sum + number));

  const averageAgeDifferancesSons
  = +(ageDifferencesSon / sonsOfTheMothers.length).toFixed(2);

  return !onlyWithSon
    ? averageAgeDifferances
    : averageAgeDifferancesSons;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
