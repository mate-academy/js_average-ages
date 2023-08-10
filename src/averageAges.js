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
  const men = people.filter(person => person.sex === 'm');
  const ages = men.reduce((sum, { died, born }) => sum + (died - born), 0);
  const menByCentury = men
    .filter(({ died }) => Math.ceil(died / 100) === century);
  const agesByCentury = menByCentury
    .reduce((sum, { died, born }) => sum + (died - born), 0);

  return century ? (agesByCentury / menByCentury.length) : (ages / men.length);
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
  const women = people.filter(person => person.sex === 'f');
  const ages = women.reduce((sum, { died, born }) => sum + (died - born), 0);
  const womenWithChildren = women.filter(woman => {
    return people.some(person => person.mother === woman.name);
  });
  const agesWithChildren = womenWithChildren
    .reduce((sum, { died, born }) => sum + (died - born), 0);

  return withChildren
    ? agesWithChildren / womenWithChildren.length
    : ages / women.length;
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
  const children = people.filter(person => {
    return people.some(human => human.name === person.mother);
  });

  const sons = children.filter(child => child.sex === 'm');

  const ageDifference = [];
  const ageDifferenceSons = [];

  for (const child of children) {
    ageDifference.push(countAgeDifference(child));
  }

  for (const son of sons) {
    ageDifferenceSons.push(countAgeDifference(son));
  }

  const averageAgeDifference = ageDifference
    .reduce((sum, age) => sum + age, 0) / children.length;

  const averageAgeDifferenceSons = ageDifferenceSons
    .reduce((sum, age) => sum + age, 0) / sons.length;

  function countAgeDifference(child) {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  };

  return onlyWithSon
    ? averageAgeDifferenceSons
    : averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
