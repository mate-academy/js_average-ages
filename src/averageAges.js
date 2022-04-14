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
function average(arr) {
  return arr.reduce((prev, curr) =>
    prev + curr, 0) / arr.length;
}

function averageAge(arr) {
  return arr.reduce((prev, curr) =>
    prev + (curr.died - curr.born), 0) / arr.length;
}

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => person.sex === 'm'
    && ((century)
      ? century === Math.ceil(person.died / 100)
      : true)
  );

  return averageAge(onlyMen);
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
function isMother(people, nameMother) {
  return people.some(person => person.mother === nameMother);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(person => person.sex === 'f'
    && ((withChildren)
      ? isMother(people, person.name)
      : true)
  );

  return averageAge(onlyWomen);
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
function findMother(people, nameMother) {
  return people.find(person => person.name === nameMother);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const allPeopleOrMen = (onlyWithSon)
    ? people.filter(person => person.sex === 'm')
    : people;

  const diffAge = allPeopleOrMen.map(person => {
    const mother = { ...findMother(people, person.mother) };

    return person.born - mother.born;
  }).filter(number => !isNaN(number));

  return average(diffAge);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
