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
  const men = people.filter(
    person => person.sex === 'm'
  );

  const menAverage = men.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0
  );

  const menCentury = men.filter(
    person => Math.ceil(person.died / 100) === century
  );

  const menCenturyAverage = menCentury.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0
  );

  return (arguments.length !== 2)
    ? menAverage / men.length
    : menCenturyAverage / menCentury.length;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const female = people.filter(
    person => person.sex === 'f'
  );

  const femaleAverage = female.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0
  );

  const femaleWithChildren = female.filter(
    mom => people.some(
      child => child.mother === mom.name
    )
  );

  const femaleWithChildrenAverage = femaleWithChildren.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0
  );

  return (arguments.length !== 2)
    ? femaleAverage / female.length
    : femaleWithChildrenAverage / femaleWithChildren.length;
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
  const female = people.filter(
    person => person.sex === 'f'
  );

  const mothersWithChildren = female.filter(
    mom => people.some(
      child => child.mother === mom.name
    )
  );

  const mothersWithSon = people.filter(
    person => people.some(
      child => child.name === person.mother
    )
      && person.sex === 'm'
  );

  const childrenWithMother = people.filter(
    child => people.some(
      mom => mom.name === child.mother
    )
  );

  const differenceMotherAndChild = mothersWithChildren.reduce(
    (accumulator, mom) => {
      let previous = accumulator;

      childrenWithMother.forEach(child => {
        if (child.mother === mom.name) {
          previous += child.born - mom.born;
        }
      });

      return previous;
    }, 0
  );

  const differenceMotherAndSon = mothersWithChildren.reduce(
    (accumulator, mom) => {
      let previous = accumulator;

      mothersWithSon.forEach(child => {
        if (child.mother === mom.name) {
          previous += child.born - mom.born;
        }
      });

      return previous;
    }, 0
  );

  return (arguments.length === 2)
    ? differenceMotherAndSon / mothersWithSon.length
    : differenceMotherAndChild / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
