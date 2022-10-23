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
  const men = people.filter(person => century
    ? person.sex === 'm' && century === Math.ceil(person.died / 100)
    : person.sex === 'm'
  );

  return calcAges(men);
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
  const name = people.map(person => person.mother);
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && name.includes(person.name)
    : person.sex === 'f'
  );

  return calcAges(women);
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
  const children = people.filter(person => onlyWithSon
    ? person.mother && person.sex === 'm'
    : person.mother
  );

  const childMother = children.map(
    child => Object.assign(
      child, { motherBorn: findMotherBorn(people, child.mother) }
    )
  );

  const isMother = childMother.filter(person => person.motherBorn);

  const difference = isMother.map(
    child => child.born - child.motherBorn
  );
  const sumDiff = difference.reduce((sum, age) => sum + age, 0);

  return sumDiff / difference.length;
}

function findMotherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother ? mother.born : false;
}

function calcAges(parent) {
  const ages = parent.map(person => person.died - person.born);
  const agesArr = ages.reduce((sum, age) => sum + age, 0);

  return agesArr / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
