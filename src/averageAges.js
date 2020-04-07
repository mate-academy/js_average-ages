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
  let filteredMen = people.filter(person => person.sex === 'm');

  filteredMen = century
    ? filteredMen.filter(man => Math.ceil(man.died / 100) === century)
    : filteredMen;

  const sumOfAges = filteredMen.reduce((accumulator, man) => {
    return accumulator + man.died - man.born;
  }, 0);
  const averageAge = sumOfAges / filteredMen.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filteredWomen = people.filter(person => person.sex === 'f');

  filteredWomen = withChildren
    ? filteredWomen.filter(woman => people.some(person => {
      return person.mother === woman.name;
    }))
    : filteredWomen;

  const sumOfAges = filteredWomen.reduce((accumulator, woman) => {
    return accumulator + woman.died - woman.born;
  }, 0);
  const averageAge = sumOfAges / filteredWomen.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let kids = people.filter(kid => people.some(mother => {
    return kid.mother === mother.name;
  }));

  kids = onlyWithSon
    ? kids.filter(kid => kid.sex === 'm')
    : kids;

  const ageDifference = kids.map(kid => {
    const mother = people.find(person => kid.mother === person.name);

    return kid.born - mother.born;
  });

  const sumOfAges = ageDifference.reduce((accumulator, age) => {
    return accumulator + age;
  });

  return sumOfAges / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
