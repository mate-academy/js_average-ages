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
function calculateMenAverageAge(people, century = 0) {
  const filteredBySex = people.filter(elem => elem['sex'] === 'm');

  const filteredByCentury = filteredBySex.filter(elem =>
    (Math.ceil(elem['died'] / 100) === century));

  const sumOfMenAgesWithCent = filteredByCentury.reduce((acc, b) =>
    acc + (b['died'] - b['born']), 0);

  const sumOfMenAges = filteredBySex.reduce((acc, b) =>
    acc + (b['died'] - b['born']), 0);

  return century
    ? sumOfMenAgesWithCent / filteredByCentury.length
    : sumOfMenAges / filteredBySex.length;
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
  const filteredBySex = people.filter(elem => elem['sex'] === 'f');
  const filteredByChilds = filteredBySex.filter(hasChild => {
    return people.some(elem => hasChild.name === elem.mother);
  });
  const sumOfWomanAgesWithChilds = filteredByChilds.reduce((acc, b) =>
    acc + (b['died'] - b['born']), 0);

  const sumOfWomenAges = filteredBySex.reduce((acc, b) =>
    acc + (b['died'] - b['born']), 0);

  return !withChildren
    ? sumOfWomenAges / filteredBySex.length
    : sumOfWomanAgesWithChilds / filteredByChilds.length;
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
  const child = !onlyWithSon
    ? people.filter(item => {
      return people.find(elem => elem.name === item.mother);
    })

    : people.filter(item => {
      return people.find(elem => elem.name === item.mother && item.sex === 'm');
    });

  // eslint-disable-next-line max-len
  const ageDif = child.map(elem => elem.born - people.find(item =>
    item.name === elem.mother).born);

  const result = ageDif.reduce((acc, n) => acc + n, 0) / ageDif.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
