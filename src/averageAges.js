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
  const onlyMen = people.filter(men => men.sex === 'm');
  const ages = onlyMen.map(year => year.died - year.born);

  const agesCentury = onlyMen
    .filter(men => Math.ceil(men.died / 100) === century)
    .map(year => year.died - year.born);

  return typeof century === 'number'
    ? agesCentury.reduce((sum, age) => sum + age, 0) / agesCentury.length
    : ages.reduce((sum, age) => sum + age, 0) / ages.length;
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
  const onlyWomen = people.filter(person => person.sex === 'f');
  const ages = onlyWomen.map(person => person.died - person.born);

  const mothers = onlyWomen
    .filter(person => people.find(child => child.mother === person.name))
    .map(person => person.died - person.born);

  return withChildren === true
    ? mothers.reduce((sum, age) => sum + age) / mothers.length
    : ages.reduce((sum, age) => sum + age) / ages.length;
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
  let children = people.filter(child => {
    return people.some(mother => child.mother === mother.name);
  });

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDiff = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((x, y) => x + y, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
