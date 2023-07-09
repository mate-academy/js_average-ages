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
  const men = people.filter(person =>
    person.sex === 'm' && (century === undefined
      || Math.ceil(person.died / 100) === century)
  );

  const averageAge = allAgesSum(men);

  return averageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    person.sex === 'f' && (!withChildren || hasChildren(person, people))
  );

  const averageAge = allAgesSum(women);

  return averageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const agesDiff = [];

  people.forEach(mother => {
    const children = people.filter(child =>
      child.mother === mother.name && (!onlyWithSon || child.sex === 'm'));

    children.forEach(child => {
      const ageDiff = child.born - mother.born;

      agesDiff.push(ageDiff);
    });
  });

  const sum = agesDiff.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);

  const average = agesDiff.length > 0 ? sum / agesDiff.length : 0;

  return average;
}

function allAgesSum(people) {
  const agesSum = people.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const count = people.length;

  return count > 0 ? agesSum / count : 0;
}

function hasChildren(person, people) {
  return people.some(child => child.mother === person.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
