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
  const men = people
    .filter(person => person['sex'] === 'm')
    .filter(man => (century) ? Math.ceil(man.died / 100) === century : true);

  const sumOfAge = men
    .reduce((sum, man) => { return sum + (man.died - man.born); }, 0);

  return sumOfAge / men.length;
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
  const mothers = people.filter(person => person
    .mother !== null).map(el => el.mother);

  const women = people
    .filter(person => person.sex === 'f')
    .filter(el => (withChildren) ? mothers.includes(el.name) : true);

  const sumOfAge = women
    .reduce((sum, woman) => { return sum + (woman.died - woman.born); }, 0);

  return sumOfAge / women.length;
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
  const allMothersArr = people
    .filter(person => person.mother !== null)
    .map(el => el.mother);
  const peopleArr = people.map(el => el.name);
  const mothersWithAgeArr = allMothersArr
    .filter(mother => peopleArr.includes(mother));

  const womenMothers = people
    .filter(el => mothersWithAgeArr.includes(el.name));

  const children = people
    .filter(person => mothersWithAgeArr.includes(person.mother))
    .map(child => {
      const mom = womenMothers.find(el => el.name === child.mother);
      child['motherBorn'] = mom.born;
      return child;
    })
    .filter(child => (onlyWithSon) ? child.sex === 'm' : true);

  const sumOfAgeDiff = children
    .reduce((sum, child) => { return sum + child.born - child.motherBorn; }, 0);

  return sumOfAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
