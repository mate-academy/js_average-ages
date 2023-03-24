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
  const persons = century
    ? people.filter(person => (
      century === Math.ceil(person.died / 100) && person.sex === 'm'
    ))
    : people.filter(person => person.sex === 'm');

  const allAges = getAge(persons);
  const average = getAverageAges(allAges);

  return Number(average);
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
  const womens = withChildren
    ? people
      .filter(person => person.mother !== null)
      .map(person => person.mother)
    : people.filter(women => women.sex === 'f');

  const mothers = people.filter(women => womens.includes(women.name));
  const womensWithChildren = getAge(mothers);

  const womensWithoutChildren = getAge(womens);
  // womens.map(women => women.died - women.born);
  const average = withChildren
    ? getAverageAges(womensWithChildren)
    : getAverageAges(womensWithoutChildren);

  return Number(average);
};

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
  const womens = onlyWithSon
    ? people.filter(person => hasMother(people, person) && person.sex === 'm')
    : people.filter(person => hasMother(people, person));

  const average = (womens.reduce((accumulator, women) => {
    const mother = people.find(mom => mom.name === women.mother);
    const diference = women.born - mother.born;

    return accumulator + diference;
  }, 0) / womens.length).toFixed(2);

  return Number(average);
}

function getAverageAges(age) {
  return (age.reduce((accumulator, personsAge) => (
    accumulator + personsAge
  )) / age.length).toFixed(2);
}

function hasMother(people, person) {
  return people.some(mother => mother.name === person.mother);
}

function getAge(persons) {
  return persons.map(person => person.died - person.born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
