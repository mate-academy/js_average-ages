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
  const menForCentury = people.filter(x => {
    return Math.ceil(x.died / 100) === century && x.sex === 'm';
  });
  const forMen = people.filter(x => x.sex === 'm');

  const ageWithCentury = menForCentury.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / menForCentury.length;
  const ageWithoutCentury = forMen.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / forMen.length;

  return century ? ageWithCentury : ageWithoutCentury;
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
  const women = people.filter(x => x.sex === 'f');
  const womenAge = women.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / women.length;

  const mothersList = people.map((x) => x.mother);

  const mothers = people.filter(x => {
    return x.sex === 'f' && mothersList.includes(x.name);
  });

  const motherAge = mothers.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / mothers.length;

  return withChildren ? motherAge : womenAge;
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
  let children = people.filter(
    person => people.find(mother => mother.name === person.mother)
  );

  if (onlyWithSon) {
    children = children.filter((child) => child.sex === 'm');
  }

  const difference = children.map(child => {
    return child.born - people.find(mother =>
      mother.name === child.mother).born;
  });

  const averageDiff = difference.reduce((acc, curr) => {
    return (acc + curr);
  }, 0);

  return averageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
