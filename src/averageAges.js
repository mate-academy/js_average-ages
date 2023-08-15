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
 * @param {number} century
 *
 * @return {number}
 */

const thisIsMan = 'm';
const thisIsWomen = 'f';

function sumResult(agePeople) {
  return agePeople.reduce((result, age) =>
    result + age, 0);
};

function ageOfPerson(peopleAfterChecking) {
  return peopleAfterChecking.map(person =>
    person.died - person.born);
};
// manAge.reduce((result, age) =>
//     result + age, 0);

function calculateMenAverageAge(people, century) {
  const allMan = people.filter(person => person.sex === thisIsMan);
  const manFromThisCentury = !century
    ? allMan
    : allMan.filter(person => Math.ceil(person.died / 100) === century);

  const manAge = ageOfPerson(manFromThisCentury);
  const sumAgeMan = sumResult(manAge);

  return sumAgeMan / manAge.length;
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
 * @param {boolean} withChildren
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(person => person.sex === thisIsWomen);
  const womenWithChildren = !withChildren
    ? allWomen
    : allWomen
      .filter(women => people
        .some(child => child.mother === women.name));

  const ageOfWomen = ageOfPerson(womenWithChildren);
  const sumAgeOfWomen = sumResult(ageOfWomen);

  return sumAgeOfWomen / ageOfWomen.length;
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
 * @param {boolean} onlyWithSon
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildrenOrSons = !onlyWithSon
    ? people
    : people.filter(person => person.sex === thisIsMan);

  const ageGaps = allChildrenOrSons
    .map(person => {
      const mother = people.find(woman => woman.name === person.mother);

      return mother ? person.born - mother.born : null;
    })
    .filter(gap => gap);

  const averageAgeDiff = ageGaps.reduce((a, b) => a + b)
    / ageGaps.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
