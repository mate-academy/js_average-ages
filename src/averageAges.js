'use strict';

const getAverage = (array) => {
  return array.reduce((result, element) => result + element, 0)
  / array.length;
};

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
  const targetSelector = century === undefined
    ? person => (person.sex === 'm')
    : person => (
      person.sex === 'm'
      && century === Math.ceil(person.died / 100)
    );

  const men = people.filter(targetSelector);
  const menAge = men.map(man => man.died - man.born);

  return getAverage(menAge);
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
  const isMother = name => (
    people.some(person => person.mother === name)
  );

  const targetSelector = withChildren
    ? person => (person.sex === 'f' && isMother(person.name))
    : person => (person.sex === 'f');

  const women = people.filter(targetSelector);
  const womenAge = women.map(woman => woman.died - woman.born);

  return getAverage(womenAge);
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
  const childMotherPairs = people.map((child) => {
    const mother = (!onlyWithSon || child.sex === 'm')
      && child.mother
      && people.find((person) => (
        person.name === child.mother)
      );

    return mother && [child.born, mother.born];
  });

  const ageDiff = childMotherPairs
    .filter(pair => pair)
    .map(([motherAge, childAge]) => motherAge - childAge);

  return getAverage(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
