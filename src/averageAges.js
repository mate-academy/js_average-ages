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
 *
 */

function forChooseSex(people, s) {
  return people.filter(person => person.sex === s);
}

function calculateMenAverageAge(people, century) {
  let filterMen = forChooseSex(people, 'm');

  filterMen = century
    ? filterMen.filter(man => Math.ceil(man.died / 100) === century)
    : filterMen;

  const sumAge = filterMen.reduce((accamulator, man) => {
    return accamulator + man.died - man.born;
  }, 0);

  const MenAverageAge = sumAge / filterMen.length;

  return MenAverageAge;
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
  let filterWomen = forChooseSex(people, 'f');

  filterWomen = withChildren
    ? filterWomen.filter(woman => people.some(person => {
      return person.mother === woman.name;
    }))
    : filterWomen;

  const sumOfAges = filterWomen.reduce((accumulator, woman) => {
    return accumulator + woman.died - woman.born;
  }, 0);
  const averageAge = sumOfAges / filterWomen.length;

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
