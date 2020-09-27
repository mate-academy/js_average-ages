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
  const men = people.filter(person => {
    return person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century);
  });

  return getAverageAge(men);
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
  const women = people.filter(({ name, sex }, i, arr) => {
    const hasChildren = arr.some(person => person.mother === name);

    return sex === 'f' && (!withChildren || hasChildren);
  });

  return getAverageAge(women);
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
  const childrenWithMother = people.filter(({ sex, mother }, i, arr) => {
    const hasMotherInList = arr.some(person => person.name === mother);

    return hasMotherInList && (!onlyWithSon || sex === 'm');
  });

  return getAverageAgeBabyBirth(childrenWithMother, people);
}

function getAverageAge(people) {
  const personAge = person => person.died - person.born;

  const totalAges = people.reduce((prevPersonAge, nextPerson) => {
    return prevPersonAge + personAge(nextPerson);
  }, 0);

  return totalAges / people.length;
}

function getAverageAgeBabyBirth(children, people) {
  const MotherAgeWithBabyBirth = ({ born, mother }) => {
    const personMother = people.find(person => person.name === mother);

    return born - personMother.born;
  };

  const totalAges = children.reduce((prevAge, nextChild) => {
    return prevAge + MotherAgeWithBabyBirth(nextChild);
  }, 0);

  return totalAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
