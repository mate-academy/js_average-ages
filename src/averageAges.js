'use strict';

/**
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
