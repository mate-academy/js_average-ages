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
  let counter = 0;

  const sum = century === undefined
    ? people.reduce((acc, person) => {
      if (person.sex === 'm') {
        return acc + (person.died - person.born);
      } else {
        counter++;
      }

      return acc;
    }, 0)
    : people.reduce((acc, person) => {
      if (person.sex === 'm'
        && century === Math.ceil(person.died / 100)) {
        return acc + (person.died - person.born);
      } else {
        counter++;
      }

      return acc;
    }, 0);

  return sum / (people.length - counter);
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
  let counter = 0;
  const mapOfPeople = people
    .reduce((acc, person) => ({ ...acc, [person.mother]: person }), {});

  const sum = withChildren === true
    ? people.reduce((acc, person) => {
      if (person.sex === 'f' && !!mapOfPeople[person.name]) {
        return acc + (person.died - person.born);
      } else {
        counter++;
      }

      return acc;
    }, 0)
    : people.reduce((acc, person) => {
      if (person.sex === 'f') {
        return acc + (person.died - person.born);
      } else {
        counter++;
      }

      return acc;
    }, 0);

  return sum / (people.length - counter);
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
  let counter = 0;
  const mapOfPeople = people
    .reduce((acc, person) => ({ ...acc, [person.name]: person }), {});

  const sum = onlyWithSon === undefined
    ? people.reduce((acc, kid) => {
      if (kid.mother !== null && !!mapOfPeople[kid.mother]) {
        return acc + kid.born - mapOfPeople[kid.mother].born;
      } else {
        counter++;
      }

      return acc;
    }, 0)
    : people.reduce((acc, kid) => {
      if (kid.sex === 'm'
        && kid.mother !== null && !!mapOfPeople[kid.mother]) {
        return acc + kid.born - mapOfPeople[kid.mother].born;
      } else {
        counter++;
      }

      return acc;
    }, 0);

  return sum / (people.length - counter);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
