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
  const sum = century === undefined
    ? people.reduce((acc, person) => {
      if (person.sex === 'm') {
        acc[0] += (person.died - person.born);
        return [...acc, (person.died - person.born)];
      }

      return acc;
    }, [0])
    : people.reduce((acc, person) => {
      if (person.sex === 'm'
        && century === Math.ceil(person.died / 100)) {
        acc[0] += (person.died - person.born);
        return [...acc, (person.died - person.born)];
      }

      return acc;
    }, [0]);

  return sum[0] / (sum.length - 1);
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
  const mapOfPeople = people
    .reduce((acc, person) => ({ ...acc, [person.mother]: person }), {});

  const sum = withChildren === true
    ? people.reduce((acc, person) => {
      if (person.sex === 'f' && !!mapOfPeople[person.name]) {
        acc[0] += (person.died - person.born);
        return [...acc, (person.died - person.born)];
      }

      return acc;
    }, [0])
    : people.reduce((acc, person) => {
      if (person.sex === 'f') {
        acc[0] += (person.died - person.born);
        return [...acc, (person.died - person.born)];
      }

      return acc;
    }, [0]);

  return sum[0] / (sum.length - 1);
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
  const mapOfPeople = people
    .reduce((acc, person) => ({ ...acc, [person.name]: person }), {});

  const sum = onlyWithSon === undefined
    ? people.reduce((acc, kid) => {
      if (kid.mother !== null && !!mapOfPeople[kid.mother]) {
        acc[0] += kid.born - mapOfPeople[kid.mother].born;
        return [...acc, kid.born - mapOfPeople[kid.mother].born];
      }

      return acc;
    }, [0])
    : people.reduce((acc, kid) => {
      if (kid.sex === 'm'
        && kid.mother !== null && !!mapOfPeople[kid.mother]) {
        acc[0] += kid.born - mapOfPeople[kid.mother].born;
        return [...acc, kid.born - mapOfPeople[kid.mother].born];
      }

      return acc;
    }, [0]);

  return sum[0] / (sum.length - 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
