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
    const isMale = person.sex === 'm';

    return (century)
      ? isMale && Math.ceil(person.died / 100) === century
      : isMale;
  });

  const ages = men.map(man => man.died - man.born);

  return calculateAverageAge(ages);
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
  const women = people.filter(person => {
    const isFemale = person.sex === 'f';

    return (withChildren)
      ? isFemale && people.some(child => child.mother === person.name)
      : isFemale;
  });

  const ages = women.map(woman => woman.died - woman.born);

  return calculateAverageAge(ages);
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
  const women = people.filter(person => person.sex === 'f');

  const children = people.filter(person => {
    const hasMother = women.some(woman => woman.name === person.mother);
    const isSon = person.sex === 'm';

    return (onlyWithSon)
      ? isSon && hasMother
      : hasMother;
  });

  const ageDiff = children.map(child => child.born - women.find(
    woman => woman.name === child.mother).born);

  return calculateAverageAge(ageDiff);
}

function calculateAverageAge(agesArr) {
  return agesArr.reduce((prev, x) => prev + x, 0) / agesArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
