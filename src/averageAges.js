'use strict';

function getAverageAge(arr) {
  const getSum = (sum, currentNum) => {
    return sum + currentNum;
  };

  return arr.reduce(getSum, 0) / arr.length;
}

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
  const filterArr = century
    ? people.filter(person => person.sex === 'm'
    && (Math.ceil(person.died / 100) === century)
    )

    : people.filter(person => person.sex === 'm');

  const ages = filterArr.map((person) => {
    return person.died - person.born;
  });

  return getAverageAge(ages);
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
  const filterArr = people.filter((person) => {
    const fullName = person.name;

    const hasChildren = (item) => fullName === item.mother;

    return (person.sex === 'f' && people.some(hasChildren))
      || (person.sex === 'f' && (!withChildren));
  });

  const ages = filterArr.map((person) => {
    return person.died - person.born;
  });

  return getAverageAge(ages);
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
  const newArr = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ages = newArr.map((person) => {
    const mother = person.mother;

    const findMother = female => {
      return mother === female.name;
    };

    const differenceAges = people.find(findMother)
      ? person.born - people.find(findMother).born
      : undefined;

    return differenceAges;
  });

  const filterAges = ages.filter(age => age !== undefined);

  return getAverageAge(filterAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
