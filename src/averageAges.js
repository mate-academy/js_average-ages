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

function personGender(gender, century) {
  const getCentury = year => Math.ceil(year / 100);

  return gender.filter(century ? person => person.sex === 'm'
  && getCentury(person.died) === century : person => person.sex === 'm');
}

function getAverage(ages) {
  const age = ages.map(year => year.died - year.born);

  return age.reduce((acc, elem) => acc + elem) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = personGender(people, century);

  return getAverage(men);
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

function getIsMother(people, woman) {
  return people.some(names => names.mother === woman.name);
}

function getWomen(gender, children) {
  return gender.filter(children ? person => person.sex === 'f'
  && getIsMother(gender, person) : person => person.sex === 'f');
}

function calculateWomenAverageAge(people, withChildren) {
  const women = getWomen(people, withChildren);

  return getAverage(women);
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

function findChildren(person, child) {
  return person.some(women => women.name === child.mother);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? findChildren(people, child) && child.sex === 'm'
    : findChildren(people, child)
  );

  const avg = children.reduce((acc, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return acc + child.born - mother.born;
  }, 0);

  return avg / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
