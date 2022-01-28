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
  const men = century
    ? people
      .filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAge = men.map(person => person.died - person.born);

  return menAge.reduce((sum, age) => sum + age) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(children => children.mother);
  const women = withChildren
    ? people
      .filter(person => person.sex === 'f')
      .filter(person => mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  return Number((women.reduce((sum, person) => sum
   + (person.died - person.born), 0) / women.length).toFixed(2));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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
  const men = people.filter(person => person.sex === 'm');
  const childs = onlyWithSon
    ? men
    : people;

  const mothers = childs
    .map(children => children.mother)//  массив состоящий из имен матерей
    .map((mother) => {
      //  замена объектами из массива сhilds по соотвествующему имени
      let mom = mother;

      mom = people.find(person => person.name === mother);

      return mom;
    });

  const differenceBetweenAges = mothers.map((person, index) => {
    const momAge = person === undefined
      ? undefined
      : childs[index].born - person.born;

    return momAge;
  }).filter(notUndefinedValues => notUndefinedValues !== undefined);

  return Number((differenceBetweenAges.reduce((total, difference) => {
    return total + difference;
  }) / differenceBetweenAges.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
