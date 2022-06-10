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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return men.reduce((acc, rec) => {
    return acc + (rec.died - rec.born);
  }, 0) / men.length;
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
  // write code here
  const womensAge = people.filter(person => person.sex === 'f').map(person =>
    person.died - person.born);
  const sumWomensAge = womensAge.reduce((prev, curr) => prev + curr, 0);
  const averageWomenAge = sumWomensAge / womensAge.length;

  const mothers = people.filter(mother => people.some(person =>
    person.mother === mother.name)).map(person =>
    person.died - person.born);
  const sumMothersAge = mothers.reduce((prev, curr) => prev + curr, 0);
  const averageMotherAge = sumMothersAge / mothers.length;

  return withChildren ? averageMotherAge : averageWomenAge;
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
  // write code here

  const childs = people.filter(child => people.some(mom =>
    mom.name === child.mother));

  const motherAge = childs.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  const ageDiff = motherAge.reduce((prev, curr) =>
    prev + curr, 0) / motherAge.length;

  const sons = people.filter(son => people.some(mom =>
    mom.name === son.mother)).filter(son => son.sex === 'm');

  const motherWithSonAge = sons.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  const onlySonsAgeDiff = motherWithSonAge.reduce((prev, curr) =>
    prev + curr, 0) / motherWithSonAge.length;

  return onlyWithSon ? onlySonsAgeDiff : ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
