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
  let averageAge = 0;

  century
    ? averageAge = people.filter(el => el.sex === 'm'
      && Math.ceil(el.died / 100) === century)
      .reduce((a, b) => a + b.died - b.born, 0) / people
      .filter(el => el.sex === 'm'
      && Math.ceil(el.died / 100) === century).length
    : averageAge = people.filter(el => el.sex === 'm')
      .reduce((a, b) => a + b.died - b.born, 0) / people
      .filter(el => el.sex === 'm').length;

  return averageAge;
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
  let averageAge = 0;

  withChildren
    ? averageAge = people.filter(filEl => people
      .some(element => element.mother === filEl
        .name))
      .reduce((a, b) => a + b.died - b.born, 0) / people
      .filter(filEl => people.some(element => element.mother === filEl
        .name)).length
    : averageAge = people.filter(el => el.sex === 'f')
      .reduce((a, b) => a + b.died - b.born, 0) / people
      .filter(el => el.sex === 'f').length;

  return averageAge;
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
  let allAge = people.filter(a => people.find(b => a.mother === b.name));

  allAge.map(el => {
    el.childMother = people.find(b => el.mother === b.name);
  });

  allAge = allAge.reduce((a, b) => a + b.born - b.childMother.born, 0)
  / allAge.length;

  let withSon = people.filter(a => people
    .find(b => a.mother === b.name && a.sex === 'm'));

  withSon.map(el => {
    el.childMother = people.find(b => el.mother === b.name);
  });

  withSon = withSon.reduce((a, b) => a + b.born - b.childMother.born, 0)
  / withSon.length;

  return onlyWithSon ? withSon : allAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
