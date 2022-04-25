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
    ? person.sex !== 'f'
    : person.sex !== 'f'
    && Math.ceil((person.died / 100)) === century);

  return men.map(man => man.died - man.born)
    .reduce((prev, startValue) => prev + startValue, 0) / men.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach`
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : people.some(child => child.mother === person.name));

  return women.map(woman => woman.died - woman.born)
    .reduce((prev, startValue) => prev + startValue, 0) / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // const mothers = people.filter(mother => !onlyWithSon
  //   ? people.some(child => child.mother === mother.name)
  //   : people.some(son => son.mother === mother.name && son.sex === 'm'));

  const kids = people.filter(kid => !onlyWithSon
    ? people.some(mother => kid.mother === mother.name)
    : kid.sex === 'm' && people.some(mother => kid.mother === mother.name));

  const averageAge = kids.map(child => {
    const mother = people.find(mom =>
      mom.name === child.mother);

    return child.born - mother.born;
  });

  return averageAge.reduce((prev, startValue) =>
    prev + startValue, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
