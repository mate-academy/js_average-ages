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
  const filtered = people.filter(person => {
    const isMan = person.sex === 'm';

    return century
      ? Math.ceil(person.died / 100) === century && isMan
      : isMan;
  });

  const ages = filtered.reduce((a, b) => a + (b.died - b.born), 0);

  return ages / filtered.length;
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
  const filtered = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  );

  const ages = filtered.reduce((a, b) => a + (b.died - b.born), 0);

  return ages / filtered.length;
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
  const womenArr = people.filter(person => people.find(child => {
    const isChild = child.mother === person.name;

    return onlyWithSon
      ? isChild && child.sex === 'm'
      : isChild;
  }));

  const arr = [];

  womenArr.forEach(person => people.find(child => {
    const isChild = child.mother === person.name;
    const age = child.born - person.born;

    onlyWithSon
      ? isChild && child.sex === 'm'
        && arr.push(age)
      : isChild
        && arr.push(age);
  }));

  const ages = arr.reduce((a, b) => a + b);

  return ages / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
