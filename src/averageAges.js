'use strict';

// eslint-disable-next-line no-extend-native
Array.prototype.getAvarage = function() {
  return this.reduce((v, w) => v + w, 0) / this.length;
};

/******************************************************************************
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
 *****************************************************************************/

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return men.map(man => man.died - man.born).getAvarage();
}

/******************************************************************************
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
 *****************************************************************************/

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person, i, arr) =>
    withChildren
      ? person.sex === 'f' && arr.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return women.map(woman => woman.died - woman.born).getAvarage();
}

/******************************************************************************
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
 *****************************************************************************/
function calculateAverageAgeDiff(people, onlyWithSon) {
  const moms = people.filter((v, i, arr) =>
    v.sex === 'f' && arr.some(w => w.mother === v.name));

  const sons = people.filter((v, i, arr) =>
    v.sex === 'm' && arr.some(w => w.name === v.mother));

  const children = people.filter((v, i, arr) =>
    arr.some(w => w.name === v.mother));

  return onlyWithSon
    ? sons
      .map(son =>
        son.born - moms.find(mom => mom.name === son.mother).born)
      .getAvarage()
    : children
      .map(child =>
        child.born - moms.find(mom => mom.name === child.mother).born)
      .getAvarage();
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
