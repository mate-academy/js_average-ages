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
  const men = people.filter(person => {
    return person.sex === 'm' && (century
      ? Math.ceil(person.died / 100) === century
      : true);
  });
  const menAges = men.map(man => man.died - man.born);

  return calculateAverageAge(menAges);
}

function calculateAverageAge(arrayToCalculate) {
  const totalAge = arrayToCalculate.reduce((accumulator, currentValue) => {
    return currentValue + accumulator;
  }, 0);

  return totalAge / arrayToCalculate.length;
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
  let women = people.filter(woman => woman.sex === 'f');

  women = withChildren
    ? women = women.filter(woman => people
      .some(person => person.mother === woman.name))
    : women;

  const womenAges = women.map(woman => woman.died - woman.born);

  return calculateAverageAge(womenAges);
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageDifferences = filteredPeople.reduce((accumulator, human) => {
    const mother = people.find(person => person.name === human.mother);

    if (mother) {
      accumulator.push(human.born - mother.born);
    }

    return accumulator;
  }, []);

  return calculateAverageAge(ageDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
