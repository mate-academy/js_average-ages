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
  const men = people.filter(({ sex, died }) => (
    sex === 'm'
      && (!century || Math.ceil(died / 100) === century)
  ));

  const menAges = getAges(men);

  return getAverageNumber(menAges);
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
  const women = people.filter(({ name, sex }, index, peopleList) => (
    sex === 'f'
      && (!withChildren || peopleList.some(person => person.mother === name))
  ));

  const womenAges = getAges(women);

  return getAverageNumber(womenAges);
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
  const childrenWithMotherHere = people.filter(
    ({ sex, mother }, index, peopleList) => (
      peopleList.some(({ name }) => name === mother)
        && (!onlyWithSon || sex === 'm')
    )
  );

  const ageDiffs = childrenWithMotherHere.map(({ born, mother }) => {
    const motherOfChild = people.find(person => person.name === mother);

    return born - motherOfChild.born;
  });

  return getAverageNumber(ageDiffs);
}

function getAverageNumber(numbers) {
  const sumOfNumbers = numbers.reduce((sum, number) => sum + number, 0);

  return sumOfNumbers / numbers.length;
}

function getAges(people) {
  return people.map(({ died, born }) => died - born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
