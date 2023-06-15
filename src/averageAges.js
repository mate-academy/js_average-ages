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
  const menAges = isMan(century, people).map(man => man.died - man.born);

  const averageAge = menAges
    .reduce((accumulator, curentValue) =>
      accumulator + curentValue, 0) / menAges.length;

  return averageAge;
}

function isMan(century, people) {
  const mans = century === undefined
    ? people.filter(man => man.sex === 'm')
    : people.filter(man => man.sex === 'm'
    && Math.ceil(man.died / 100) === century);

  return mans;
};

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
  const womenAges = isWoman(withChildren, people)
    .map(woman => woman.died - woman.born);

  const averageAge = womenAges.reduce((accumulator, curentValue) =>
    accumulator + curentValue, 0) / womenAges.length;

  return averageAge;
}

function isWoman(withChildren, people) {
  const filteredWoman = withChildren === undefined
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(woman => people
      .some(person => person.mother === woman.name));

  return filteredWoman;
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
  const averageAgeDiff = isChildren(people, onlyWithSon)
    .reduce((sum, child) => {
      const mother = people.find(woman => woman.name === child.mother);

      return sum + ((child.born - mother.born));
    }, 0) / isChildren(people, onlyWithSon).length;

  return Number(averageAgeDiff.toFixed(2));
}

function isChildren(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  return children;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
