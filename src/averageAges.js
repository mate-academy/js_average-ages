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
  const male = 'm';
  const men = filterPeopleBySex(people, male);

  const menDiedInCentury = men.filter(man => {
    const diedInCentury = Math.ceil(man.died / 100);

    return diedInCentury === century;
  });

  const ages = (
    century
      ? menDiedInCentury
      : men
  ).map(man => man.died - man.born);

  return calculateAverageAge(ages);
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
  const female = 'f';
  const women = filterPeopleBySex(people, female);

  const mothers = women.filter(woman => (
    people.some(person => person.mother === woman.name)
  ));

  const ages = (
    withChildren
      ? mothers
      : women
  ).map(woman => woman.died - woman.born);

  return calculateAverageAge(ages);
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
  const male = 'm';
  const female = 'f';
  const men = filterPeopleBySex(people, male);
  const women = filterPeopleBySex(people, female);

  const mothers = women.filter(woman => (
    people.some(person => person.mother === woman.name)
  ));

  const peopleWithMothers = (
    onlyWithSon
      ? men
      : people
  ).map(person => ({
    ...person,
    motherObj: mothers.find(mother => (
      mother.name === person.mother
    )),
  })).filter(child => child.motherObj);

  const ageDiffs = peopleWithMothers.map(person => (
    person.born - person.motherObj.born
  ));

  return calculateAverageAge(ageDiffs);
}

function filterPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function calculateAverageAge(ages) {
  if (ages.length === 0) {
    return 0;
  }

  const sumOfAges = ages.reduce((acc, curr) => acc + curr, 0);
  const averageAge = sumOfAges / ages.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
