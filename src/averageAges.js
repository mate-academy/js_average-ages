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
  const filteredPeople = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const averageAge = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageAge;
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
  const womenAll = people.filter((person) => person.sex === 'f');
  const womenWithChildren = womenAll.filter((women) => {
    const isMother = people.some((person) => person.mother === women.name);

    return isMother;
  });

  const filteredPeople = !withChildren
    ? womenAll
    : womenWithChildren;

  const averageAge = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageAge;
}

// console.log(calculateWomenAverageAge(allPeople, true));
// console.log(calculateWomenAverageAge(allPeople ));

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
  function addMomBorn(peopleObj, allPeople) {
    return peopleObj.map(person => {
      const boysMother = allPeople.find(folk => person.mother === folk.name);

      return {
        ...person,
        motherBorn: boysMother.born,
      };
    });
  }

  const children = people.filter(person => {
    return people.find((child) => person.mother === child.name);
  });

  const childrenBoy = people.filter(person => {
    return people.find((child) => person.mother === child.name
    && person.sex === 'm');
  });

  const filteredPeople = !onlyWithSon
    ? addMomBorn(children, people)
    : addMomBorn(childrenBoy, people);

  const averageAge = filteredPeople.map(current =>
    current.born - current.motherBorn)
    .reduce((a, b) => a + b, 0) / filteredPeople.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
