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
  const mans = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const ages = mans.map(person => person.died - person.born);
  const average = ages.reduce((prev, next) => prev + next, 0) / ages.length;

  return average;
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

function findChildren(arrayWithPeople) {
  const children = arrayWithPeople.filter(person => person.mother);

  return children;
};

function findMother(arrayWithPeople) {
  const children = findChildren(arrayWithPeople);
  const mothersNames = children.map(person => person.mother);
  const mothersWithChildren = arrayWithPeople
    .filter(person => mothersNames.indexOf(person.name) !== -1);

  return mothersWithChildren;
};

function calculateWomenAverageAge(people, withChildren) {
  let womens;

  withChildren
    ? womens = findMother(people)
    : womens = people.filter(person => person.sex === 'f');

  const womensAges = womens.map(person => person.died - person.born);
  const average = womensAges
    .reduce((prev, curr) => prev + curr, 0) / womensAges.length;

  return average;
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
function isChildsMother(people, nameMother) {
  return people.find(person => person.name === nameMother);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let isOnlyWithSon;

  onlyWithSon
    ? isOnlyWithSon = people.filter(person => person.sex === 'm')
    : isOnlyWithSon = people;

  const difference = isOnlyWithSon.map(person => {
    const mother = { ...isChildsMother(people, person.mother) };

    return person.born - mother.born;
  }).filter(number => !isNaN(number));

  const average = difference
    .reduce((prev, curr) => prev + curr, 0) / difference.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
