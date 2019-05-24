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
  let men = people.filter((person) => {
    if (person.sex !== 'm') return false;
    if (typeof century === 'undefined') return true;
    return century === Math.ceil(person.died / 100);
  });

  const ageSum = men.reduce((sum, person) => {
    const age = person.died - person.born;
    return sum + age;
  }, 0);
  return +(ageSum / men.length).toFixed(2);
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
  let women = people.filter((person) => {
    if (person.sex !== 'f') return false;
    if (!withChildren) return true;
    return people.some((persona) => {
      return persona.mother === person.name;
    });
  });

  const ageSum = women.reduce((sum, person) => {
    const age = person.died - person.born;
    return sum + age;
  }, 0);

  return (ageSum / women.length);
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
 // * @param {object[]} people
 // * @param {boolean} onlyWithSon - optional
 // *
 // * @return {number}
 // */
function calculateAverageAge(persons) {
  const ageSum = persons.reduce(function(sum, person) {
    const age = person.died - person.born;
    return sum + age;
  }, 0);

  const ageCount = persons.length;
  return (ageSum / ageCount);
}

function calculateAverageChildrenAge(mothers, people) {
  const children = people.filter(function(person) {
    return mothers.some(function(mother) {
      return mother.name === person.mother;
    });
  });
  return calculateAverageAge(children);
}
function calculateAverageAgeDiff(people, onlyWithSon) {
  let mothers;
  if ((typeof onlyWithSon === 'undefined') || (!onlyWithSon)) {
    mothers = people.filter(function(person) {
      if (person.sex !== 'f') return false;
      return people.some(function(persona) {
        return persona.mother === person.name;
      });
    });
  } else {
    mothers = people.filter(function(person) {
      if (person.sex !== 'f') return false;
      return people.some(function(persona) {
        return (persona.mother === person.name) && (persona.sex === 'm');
      });
    });
  }
  return calculateAverageAge(mothers) - calculateAverageChildrenAge(mothers, people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
