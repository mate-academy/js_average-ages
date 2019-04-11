'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men living in this century
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
  const MALE = 'm';
  function fromCentury(personDied) {
    return Math.ceil(personDied / 100) === century;
  }
  const mans = people.filter((person) => {
    return century ? (person.sex === MALE && fromCentury(person.died)) : person.sex === MALE;
  });
  const mansAges = mans.map((person) => {
    return person.died - person.born;
  });
  const averageAge = mansAges.reduce((sumAges, personAge) => {
    return sumAges + personAge;
  }, 0) / mans.length;
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
  const FEMALE = 'f';
  function isMother(people, mother) {
    return people.some((person) => {
      return person.mother === mother;
    });
  }
  const women = people.filter((person) => {
    return withChildren ? (person.sex === FEMALE && isMother(people, person.name)) : person.sex === FEMALE;
  });
  const womenAges = women.map((person) => {
    return person.died - person.born;
  });
  const averageAge = womenAges.reduce((sumAges, personAge) => {
    return sumAges + personAge;
  }, 0) / women.length;
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
  const SON = 'm';
  const mothersAndChildren = people.map((person) => {
    const mother = people.find((mother) => {
      return mother.name === person.mother;
    });
    return mother ? [mother, person] : false;
  });
  const filteredMothersAndChildren = mothersAndChildren.filter((i) => {
    return onlyWithSon ? (i !== false && i[1].sex === SON) : (i !== false);
  });

  const differenceInAges = filteredMothersAndChildren.map((family) => {
    const motherBorn = family[0].born;
    const childrenBorn = family[1].born;
    return childrenBorn - motherBorn;
  });
  const averageAge = differenceInAges.reduce((sumDifference, difference) => {
    return sumDifference + difference;
  }, 0) / differenceInAges.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
