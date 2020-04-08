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
 * @return {Number}
 */
function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter((person) =>
    !century
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  );

  const sumOfAges = onlyMen.reduce(
    (accumulator, man) => accumulator + (man.died - man.born),
    0
  );

  return sumOfAges / onlyMen.length;
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
  const onlyWomen = people.filter((person) =>
    !withChildren
      ? person.sex === 'f'
      : people.some((child) => child.mother === person.name)
  );

  const sumOfAges = onlyWomen.reduce(
    (accumulator, woman) => accumulator + (woman.died - woman.born),
    0
  );

  return sumOfAges / onlyWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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
  const childrenWithMother = people.filter((person) =>
    !onlyWithSon
      ? people.some((mother) => person.mother === mother.name)
      : people.some(
        (mother) => person.mother === mother.name && person.sex === 'm'
      )
  );

  const sumOfAges = childrenWithMother.reduce((accumulator, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return accumulator + (child.born - mother.born);
  }, 0);

  return sumOfAges / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
