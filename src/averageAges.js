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
  const AvarageAgeOfMen = men.reduce((sum, man) =>
    (sum + man.died - man.born), 0) / men.length;

  const deadmen = men.filter(man => Math.ceil(man.died / 100) === century);
  const AvarageAgeOfDeadmen = deadmen.reduce((sum, deadman) =>
    (sum + deadman.died - deadman.born), 0) / deadmen.length;

  return century ? AvarageAgeOfDeadmen : AvarageAgeOfMen;
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
  const women = people.filter(person => person.sex === 'f');
  const avarageAgeOfWomen = women.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / women.length;

  const mothers = people.map(person => person.mother);
  const mothersWithChild = women.filter(woman =>
    mothers.some(mother => mother === woman.name));
  const avarageAgeOfMothersWithChild = mothersWithChild.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / mothersWithChild.length;

  return withChildren ? avarageAgeOfMothersWithChild : avarageAgeOfWomen;
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
  const mothersWithChild = people.filter(woman =>
    people.find(person => woman.name === person.mother));

  const children = people.filter(child =>
    mothersWithChild.find(mother =>
      (mother.name === child.mother)));
  const yearsGivenBirthChild = children.map(child =>
    child.born - mothersWithChild.find(mother =>
      mother.name === child.mother).born);
  const AvarageAgeGivenDirthChild = yearsGivenBirthChild.reduce((sum, year) =>
    sum + year) / yearsGivenBirthChild.length;

  const sons = people.filter(child =>
    mothersWithChild.find(mother =>
      (mother.name === child.mother) && (child.sex === 'm')));
  const yearsGivenBirthSons = sons.map(son =>
    son.born - mothersWithChild.find(mother =>
      mother.name === son.mother).born);
  const AvarageAgeGivenDirthSon = yearsGivenBirthSons.reduce((sum, year) =>
    sum + year) / yearsGivenBirthSons.length;

  return onlyWithSon ? AvarageAgeGivenDirthSon : AvarageAgeGivenDirthChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
