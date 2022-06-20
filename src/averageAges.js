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
  const menArrNoCentury = people
    .filter(person => person.sex === 'm')
    .map(man => man.died - man.born);

  const menArrWithCentury = people
    .filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    .map(man => man.died - man.born);

  let avrAge;

  century === undefined ? avrAge = menArrNoCentury.reduce((sum, age) =>
    sum + age) / menArrNoCentury.length : avrAge
     = menArrWithCentury.reduce((sum, age) =>
      sum + age) / menArrWithCentury.length;

  return avrAge;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womenNoChild = onlyWomen.map(woman => woman.died - woman.born);
  const peopleWithMothers = people.filter(person => person.mother !== null);
  const mothersNames = peopleWithMothers.map(person => person.mother);
  const womenWithChild = onlyWomen
    .filter(woman => mothersNames.includes(woman.name))
    .map(woman => woman.died - woman.born);

  let avrAge;

  withChildren === undefined ? avrAge = womenNoChild.reduce((sum, age) =>
    sum + age) / womenNoChild.length : avrAge
    = womenWithChild.reduce((sum, age) =>
      sum + age) / womenWithChild.length;

  return avrAge;
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
  function findMother(child) {
    return people.find(mother => mother.name === child.mother);
  }

  let family = people.filter(findMother);

  if (onlyWithSon === true) {
    family = family.filter(child => child.sex === 'm');
  }

  const ageDif = family.map(child => child.born - findMother(child).born);

  const avrAge = ageDif.reduce((age1, age2) => age1 + age2) / family.length;

  return avrAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
