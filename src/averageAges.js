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
  const men = people.filter(person => !century
    ? person.sex === 'm'
    : person.sex === 'm'
      && Math.ceil(person.died / 100) === century
  );

  const average = men.reduce((acc, man) => acc + (man.died - man.born), 0);

  return average / men.length;
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
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : person.sex === 'f'
      && people.some(child => child.mother === person.name)
  );

  const average = women.reduce((acc, woman) => acc
    + (woman.died - woman.born), 0);

  return average / women.length;
};

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
  const mothers = people.filter(woman => woman.sex === 'f'
    && people.some(child => child.mother === woman.name)
  );

  const children = people.filter(person => !onlyWithSon
    ? mothers.find(mother => mother.name === person.mother)
    : mothers.find(mother => mother.name === person.mother)
      && person.sex === 'm'
  );

  const years = children.map(child =>
    child.born - mothers.find(mother => mother.name === child.mother).born);

  const average = years.reduce((x, y) => x + y, 0);

  return average / years.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
