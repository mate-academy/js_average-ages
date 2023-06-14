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
  const males = people.filter(person => {
    const isMale = person.sex === 'm';
    const inThisCentury = Math.ceil(person.died / 100) === century;

    return isMale && (century ? inThisCentury : true);
  });

  const ages = males.map(person => {
    return person.died - person.born;
  });

  return countAverageAge(ages);
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
  const hasChildren = ({ name }) => {
    return people.some((pers) => pers.mother === name);
  };

  const females = people.filter(person => {
    const isFemale = person.sex === 'f';
    const withChilds = hasChildren(person);

    return isFemale && (withChildren ? withChilds : true);
  });

  const ages = females.map(person => {
    return person.died - person.born;
  });

  return countAverageAge(ages);
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
  const findMother = (name) => {
    return people.find(person => person.name === name);
  };

  const poepleWithMother = people.filter(person => {
    const withMother = findMother(person.mother);
    const onlySons = person.sex === 'm';

    return withMother && (onlyWithSon ? onlySons : true);
  });

  const diffAges = poepleWithMother.map(person => {
    const mother = findMother(person.mother);
    const motherAge = person.born - mother.born;

    return motherAge;
  });

  return countAverageAge(diffAges);
}

const countAverageAge = (array) => {
  const average = array.reduce((acc, cur) => acc + cur, 0) / array.length;

  return +average.toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
