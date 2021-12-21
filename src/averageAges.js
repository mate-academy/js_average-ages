'use strict';

function calculateMenAverageAge(people, century = 0) {
  // write code here
  const menFromCentury = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  const averageSumAge = menFromCentury.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return averageSumAge / menFromCentury.length;
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
  // write code here
  const hasChild = (person) => people.some(child =>
    child.mother === person.name);
  const womenWithChildren = people.filter(person => withChildren
    ? person.sex === 'f' && hasChild(person)
    : person.sex === 'f');
  const averageSumAge = womenWithChildren.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return averageSumAge / womenWithChildren.length;
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
  const mother = child => people.some(some => some.name === child.mother);
  const children = people.filter(child =>
    onlyWithSon ? child.sex === 'm' && mother(child)
      : mother(child));

  const differentAge = children.map(childs => childs.born
    - people.find(mom => mom.name === childs.mother).born);

  const averageSumAge = differentAge.reduce((sum, age) =>
    sum + age) / children.length;

  return averageSumAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
