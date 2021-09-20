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
  const filterAllMen = people.filter(men => men.sex === 'm');
  const filterMenDeadInCentury = people.filter(men =>
    men.sex === 'm' && Math.ceil(men.died / 100) === century);
  const choiceMen = century ? filterMenDeadInCentury : filterAllMen;
  const averageAgesMen = choiceMen.reduce((a, b) =>
    (a + (b.died - b.born)), 0) / choiceMen.length;

  return averageAgesMen;
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
  const filterAllWomen = people.filter(women => women.sex === 'f');
  const filterWomenWithChildren = people.filter(women =>
    women.sex === 'f' && people.some(kid => kid.mother === women.name));

  const choiceWomen = withChildren ? filterWomenWithChildren : filterAllWomen;
  const averageAgesWomen = choiceWomen.reduce((a, b) =>
    (a + (b.died - b.born)), 0) / choiceWomen.length;

  return averageAgesWomen;
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
  const filterWomenWithChildren = people.filter(x =>
    people.find(y => x.name === y.mother));
  let arrayChildren = [];

  (onlyWithSon === undefined)
    ? arrayChildren = people.filter(kid =>
      filterWomenWithChildren.find(women =>
        women.name === kid.mother))
    : arrayChildren = people.filter(kid =>
      filterWomenWithChildren.find(women =>
        kid.mother === women.name) && (kid.sex === 'm'));

  const ageBetweenMotherAndChild = arrayChildren.map(kid =>
    kid.born - filterWomenWithChildren.find(women =>
      women.name === kid.mother).born);
  const averageAgesDifference = ageBetweenMotherAndChild.reduce((a, b) =>
    (a + b), 0) / ageBetweenMotherAndChild.length;

  return averageAgesDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
