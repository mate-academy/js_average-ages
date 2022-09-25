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
  const isMale = people.filter((male) => male.sex === 'm');
  const calcCentury = people.filter(
    (male) => Math.ceil(male.died / 100) === century && male.sex === 'm'
  );

  const checkResult = century ? calcCentury : isMale;

  return calculateAverage(checkResult);
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
  const isFemale = people.filter((female) => female.sex === 'f');
  const hasChildren = people.filter((female) =>
    people.find((person) => female.name === person.mother)
  );

  const checkResult = withChildren ? hasChildren : isFemale;

  return calculateAverage(checkResult);
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
  const hasMother = people.filter((child) =>
    Boolean(findMother(people, child))
  );
  const isSon = people.filter(
    (child) => Boolean(findMother(people, child)) && child.sex === 'm'
  );

  const children = onlyWithSon ? isSon : hasMother;

  return (
    children.reduce(
      (acc, cur) => acc + (cur.born - findMother(people, cur).born),
      0
    ) / children.length
  );
}

function calculateAverage(filteredData) {
  return (
    filteredData.reduce((acc, cur) => acc + (cur.died - cur.born), 0)
    / filteredData.length
  );
}

function findMother(people, person) {
  return people.find((female) => person.mother === female.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
