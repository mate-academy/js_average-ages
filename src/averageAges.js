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
  let men = people.filter(person => person.sex === 'm');
  let menAges = [];

  if (century !== undefined) {
    men = men.filter(persone => Math.ceil(persone.died / 100) === century);
  }
  menAges = men
    .map(person => (person.age = person.died - person.born));

  return menAges.reduce((sum, item) => sum + item, 0) / menAges.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f');
  let womenAges = [];

  if (withChildren) {
    women = women
      .filter(person => people
        .some(child => child.mother === person.name));
  }

  womenAges = women.map(person => (person.died - person.born));

  return womenAges.reduce((sum, item) => sum + item, 0) / womenAges.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  const children = people
    .filter(child => (
      mothers.some(mother => mother.name === child.mother)
    ));

  let childrenWithMothers = children.map(child => {
    const motherOfChild = mothers
      .find(mother => mother.name === child.mother);

    return [child, motherOfChild];
  });

  onlyWithSon && (childrenWithMothers = childrenWithMothers
    .filter(pair => (pair[0].sex === 'm'))
  );

  return childrenWithMothers.reduce((sum, childWithMother) =>
    (sum + (childWithMother[0].born - childWithMother[1].born)), 0)
    / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
