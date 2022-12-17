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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return findAverageAge(men);
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
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f'
        && people.some(herMother => person.name === herMother.mother)
      : person.sex === 'f'
  );

  return findAverageAge(women);
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
  const children = people.filter(person =>
    onlyWithSon
      ? people.some(hisMother =>
        hisMother.name === person.mother && person.sex === 'm')
      : people.some(herMother => herMother.name === person.mother)
  );

  const arrDiff = children.map((child) => {
    const mother = people.find(m => m.name === child.mother);

    return (child.born - mother.born);
  });
  const sumDiff = arrDiff.reduce((sum, item) => (sum + item));
  const averageAgeDiff = (sumDiff / children.length).toFixed(2);

  return +averageAgeDiff;
}

function findAverageAge(person) {
  const sumOfAge = person.reduce((acc, age) => acc + (age.died - age.born), 0);
  const averageAge = (sumOfAge / person.length).toFixed(2);

  return +averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
