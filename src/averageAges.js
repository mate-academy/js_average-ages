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
  const manFilter = people
    .filter(({ sex }) => sex === 'm');

  const manFilterCenteryDied = people
    .filter(({ sex, died }) => {
      return sex === 'm' && Math.ceil(died / 100) === century;
    });

  const selectedManPeople = century ? manFilterCenteryDied : manFilter;

  const ageDifferences = selectedManPeople
    .map(({ died, born }) => died - born);

  const totalAgeDifference = ageDifferences.reduce((acc, value) => acc + value);
  const avgAgeOfMan = totalAgeDifference / ageDifferences.length;

  return avgAgeOfMan;
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
  const womenFilter = people
    .filter(({ sex }) => sex === 'f');

  const womenFilterWithChild = womenFilter
    .filter(({ name }) => people.some(({ mother }) => mother === name));

  const selectedWomen = withChildren ? womenFilterWithChild : womenFilter;
  const ageDifferences = selectedWomen
    .map(({ died, born }) => died - born);

  const totalAgeDifference = ageDifferences
    .reduce((acc, value) => acc + value);

  const avgAgeOfWomen = totalAgeDifference / ageDifferences.length;

  return avgAgeOfWomen;
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
  const objWithMom = people
    .filter(({ sex }) => sex === 'f');

  const objWithChildren = people
    .filter(({ mother }) => mother !== null);

  const objWithSon = people
    .filter(({ mother, sex }) => mother !== null && sex === 'm');

  const selectedChildren = onlyWithSon ? objWithSon : objWithChildren;

  const ageDifferences = selectedChildren.map(({ mother, born }) => {
    const motherFind = objWithMom.find(({ name }) => name === mother);

    return motherFind ? born - motherFind.born : null;
  });

  const validAgeDifferences = ageDifferences
    .filter(el => el !== null);

  const totalAgeDifference = validAgeDifferences
    .reduce((acc, value) => acc + value);

  const averageAgeDifference = totalAgeDifference / validAgeDifferences.length;

  return averageAgeDifference;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
