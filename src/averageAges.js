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

  // const men = people.filter(
  //   century !== undefined
  //     ? person => person.sex === 'm'
  //     && Math.ceil(person.died / 100) === century
  //     : person => person.sex === 'm'
  // );

  const men = people.filter(person => person.sex === 'm');

  const menDiedInCentury = century !== undefined
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const agesOfMen = menDiedInCentury.map(man => man.died - man.born);

  const averageAge = agesOfMen.reduce((previous, current) => previous + current)
    / agesOfMen.length;

  return averageAge;
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
  function findMother(person) {
    return people.find(woman => woman.mother === person.name);
  }

  const femaleGender = people.filter(
    person => person.sex === 'f'
  );

  const womenWithChild
    = people.filter(person => findMother(person) && femaleGender);

  const women
    = withChildren
      ? womenWithChild
      : femaleGender;

  const womenAges = women.map(woman => woman.died - woman.born);
  const womenAverageAge
    = womenAges.reduce((previous, current) => previous + current)
    / womenAges.length;

  return womenAverageAge;
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
  function findMother(child) {
    return people.find(mother => mother.name === child.mother);
  }

  function findFamily(child) {
    const boy = child.sex === 'm';

    return onlyWithSon
      ? boy && findMother(child)
      : findMother(child);
  }

  const family = people.filter(findFamily);

  const ageDifferences
  = family.map(child => (child.born - findMother(child).born));

  const averageAgeDifference = ageDifferences.reduce(
    (total, nextAge) => total + nextAge
  ) / ageDifferences.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
