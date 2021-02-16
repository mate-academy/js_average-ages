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
  const men = people.filter(person => person.sex === 'm');
  const averagedAgeMen = men
    .reduce((sum, person) => sum + (person.died - person.born) / men.length,
      0
    );

  const centuryMen = men
    .filter(person => Math.ceil(person.died / 100) === century
    );
  const averageAgeMenCentury = centuryMen
    .reduce((sum, person) =>
      sum + (person.died - person.born) / centuryMen.length,
    0
    );

  return century ? averageAgeMenCentury : averagedAgeMen;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const women = people.filter(person => person.sex === 'f');
  const averageAgeWomen = women
    .reduce((sum, person) => sum + (person.died - person.born) / women.length,
      0
    );

  const child = people
    .filter(girl => people.some(person => person.name === girl.mother)
    );
  const withChild = people
    .filter(person => child.some(girl => girl.mother === person.name)
    );
  const averageWithChildAge = withChild
    .reduce((sum, person) =>
      sum + (person.died - person.born) / withChild.length,
    0
    );

  return withChildren ? averageWithChildAge : averageAgeWomen;
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
  const childs = people
    .filter(women => people.some(person => person.name === women.mother)
    );
  const childsAges = childs
    .map(women =>
      women.born - people.find(person => person.name === women.mother).born
    );
  const childsAgesDifference = childsAges
    .reduce((sum, years) => sum + years) / childs.length;

  const sons = people
    .filter(kid =>
      people.some(person => person.name === kid.mother) && kid.sex === 'm'
    );
  const sonsAges = sons
    .map(kid =>
      kid.born - people.find(person => person.name === kid.mother).born
    );
  const sonsAgesDifference = sonsAges
    .reduce((sum, years) => sum + years) / sons.length;

  return onlyWithSon ? sonsAgesDifference : childsAgesDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
