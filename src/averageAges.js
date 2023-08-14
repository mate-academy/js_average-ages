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
const MALE = 'm';
const FEMALE = 'f';

function calculateMenAverageAge(people, century) {
  const malePeople = people.filter(person =>
    person.sex === MALE
    && (century === undefined || century === Math.ceil(person.died / 100)));

  const averageMaleSum = malePeople.reduce((all, person) =>
    all + (person.died - person.born), 0);

  const averageAgeMale = averageMaleSum / malePeople.length;

  return averageAgeMale;
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
  const femalePeople = people.filter(person => person.sex === FEMALE);
  let averageFemaleSum = 0;

  if (withChildren) {
    const femaleWithChild = femalePeople.filter(person =>
      people.some(child => child.mother === person.name));

    averageFemaleSum = femaleWithChild.reduce((all, person) =>
      all + (person.died - person.born), 0);

    const averageAgeFemaleChild = averageFemaleSum / femaleWithChild.length;

    return averageAgeFemaleChild;
  }

  averageFemaleSum = femalePeople.reduce((all, person) =>
    all + (person.died - person.born), 0);

  const averAgeFemale = averageFemaleSum / femalePeople.length;

  return averAgeFemale;
}

//  * @param {object[]} people
//  * @param {boolean} onlyWithSon - optional
//  *
//  * @return {number}
//  */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childWithMother = people
    .filter(person => (onlyWithSon
      ? person.sex === MALE
      : true) && (people.some(child => child.name === person.mother)
    ));

  const arrayMothersAges = childWithMother.map(person =>
    ({
      died: person.born,
      born: people.find(mother => person.mother === mother.name).born,
    })
  );

  const AgeMotherSon = arrayMothersAges.reduce((all, person) =>
    all + (person.died - person.born), 0);

  const averageMotherAgeWithSon = AgeMotherSon / childWithMother.length;

  return averageMotherAgeWithSon;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
