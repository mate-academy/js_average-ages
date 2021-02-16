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
  const allMen = people.filter(
    person => person.sex === 'm'
  );
  const menOfTheCentury = allMen.filter(
    person => Math.ceil(person.died / 100) === century
  );
  const men = century === undefined ? allMen : menOfTheCentury;

  return men.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  ) / men.length;
}

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
  const allWomen = people.filter(person => person.sex === 'f');
  const womenWithChildren = allWomen.filter(
    woman => people.some(person => person.mother === woman.name)
  );
  let women;

  arguments.length > 1 ? women = womenWithChildren : women = allWomen;

  return women.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  ) / women.length;
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
  const allChildren = people.filter(
    person => people.find(mother => person.mother === mother.name)
  );
  const boys = allChildren.filter(child => child.sex === 'm');
  let children;

  onlyWithSon ? children = boys : children = allChildren;

  return children.reduce(
    (sum, child) => sum + (child.born - people.find(
      mother => child.mother === mother.name
    ).born),
    0
  ) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
