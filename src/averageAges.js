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
  const listOfMen = century === undefined
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) => (
      (sex === 'm') && (Math.ceil(died / 100) === century)
    ));

  const sumOfMenAges = sumOfAges(listOfMen);
  const menAverageAge = calculateAverageAge(listOfMen, sumOfMenAges);

  return +menAverageAge.toFixed(2);
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
  const listOfWomen = withChildren !== true
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter(({ name }) => (
      people.find(({ mother }) => mother === name)
    ));

  const sumOfWomenAges = sumOfAges(listOfWomen);
  const womenAverageAge = calculateAverageAge(listOfWomen, sumOfWomenAges);

  return +womenAverageAge.toFixed(2);
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
  const listOfChildrens = onlyWithSon === true
    ? people.filter(({ mother, sex }) => (
      people.find(({ name }) => (
        (mother === name) && (sex === 'm')
      ))
    ))
    : people.filter(({ mother }) => (
      people.find(({ name }) => mother === name)
    ));

  const sumOfAgeDiff = listOfChildrens.reduce((sum, { mother, born }) => {
    const childBorn = born;
    let motherBorn;

    people.find((woman) => {
      motherBorn = woman.born;

      return mother === woman.name;
    });

    return childBorn - motherBorn + sum;
  }, 0);

  const AverageAgeDiff = calculateAverageAge(listOfChildrens, sumOfAgeDiff);

  return +AverageAgeDiff.toFixed(2);
}

const sumOfAges = (list) =>
  list.reduce((sum, { born, died }) =>
    (died - born + sum), 0);
const calculateAverageAge = (list, sum) => sum / list.length;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
