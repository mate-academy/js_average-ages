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

function filterBySex(sex) {
  return (person) => person.sex === sex;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(filterBySex('m'));

  if (century) {
    men = men.filter(man =>
      Math.ceil(man.died / 100) === century);
  }

  const averageAge = men.reduce((prev, man) =>
    prev + man.died - man.born, 0)
  / men.length;

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
  let women = people.filter(filterBySex('f'));

  if (withChildren) {
    women = women.filter(
      woman => people.some(
        person => person.mother === woman.name
      )
    );
  }

  const averageAge = women.reduce(
    (summaryAge, woman) => summaryAge + woman.died - woman.born,
    0
  ) / women.length;

  return averageAge;
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
  let childs = people.filter(
    person => people.find(
      person2 => person2.name === person.mother
    )
  );

  if (onlyWithSon) {
    childs = childs.filter(filterBySex('m'));
  }

  const ageDiffs = childs.map(child => {
    const childBirthYear = child.born;
    const mother = people.find(person => person.name === child.mother);
    const motherBirthYear = mother.born;

    return childBirthYear - motherBirthYear;
  }
  );

  const summaryAgeDiff = ageDiffs.reduce((summaryAge, age) => summaryAge + age);

  return summaryAgeDiff / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
