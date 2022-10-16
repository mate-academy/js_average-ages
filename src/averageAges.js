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
  let menFilter = people.filter(person => person.sex === 'm');

  if (century) {
    menFilter = people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));
  }

  const ages = menFilter.map(man => man.died - man.born);
  const agesArr = ages.reduce((sum, age) => sum + age, 0);

  return agesArr / ages.length;
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
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
 * @param {boolean} withChild - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChild) {
  let womenFilter = people.filter(person => person.sex === 'f');
  const motherName = people.map(person => person.mother);

  if (withChild) {
    womenFilter = people.filter(person => person.sex === 'f'
      && motherName.includes(person.name));
  }

  const ages = womenFilter.map(woman => woman.died - woman.born);
  const agesArr = ages.reduce((sum, age) => sum + age, 0);

  return agesArr / ages.length;
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
  let children = people.filter(person => person.mother !== null);

  if (onlyWithSon) {
    children = people.filter(person => person.mother !== null
      && person.sex === 'm');
  }

  const childMother = children.map(
    child => Object.assign(
      child, { motherBorn: findMotherBorn(people, child.mother) }
    )
  );

  const isMother = childMother.filter(person => person.motherBorn !== false);

  const difference = isMother.map(
    child => child.born - child.motherBorn
  );
  const sumDiff = difference.reduce((sum, age) => sum + age, 0);

  return sumDiff / difference.length;
}

function findMotherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  if (mother) {
    return mother.born;
  } else {
    return false;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
