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
  let onlyMen = people.filter(person => person.sex === 'm');

  if (century) {
    onlyMen = people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));
  }

  const ages = onlyMen.map(man => man.died - man.born);
  const sumAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAges = sumAges / ages.length;

  return averageAges;
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
  let onlyWomen = people.filter(person => person.sex === 'f');
  const motherName = people.map(person => person.mother);

  if (withChildren) {
    onlyWomen = people.filter(person => person.sex === 'f'
      && motherName.includes(person.name));
  }

  const ages = onlyWomen.map(woman => woman.died - woman.born);
  const sumAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAges = sumAges / ages.length;

  return averageAges;
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

  const childrenMom = children.map(
    child => Object.assign(
      child, { motherBorn: findMotherBorn(people, child.mother) }
    )
  );

  const childrenMomReal = childrenMom.filter(
    person => person.motherBorn !== false
  );

  const difference = childrenMomReal.map(
    child => child.born - child.motherBorn
  );
  const sumDifference = difference.reduce((sum, age) => sum + age, 0);
  const averageDifference = sumDifference / difference.length;

  return averageDifference;
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
