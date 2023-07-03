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
function calculateAverage(arr) {
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((total, value) => total + value, 0);

  return sum / arr.length;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(person => {
    return person.sex === 'm';
  });

  men = century
    ? men.filter((elem) => Math.ceil(elem.died / 100) === century)
    : men;

  const ages = men.map((man) => man.died - man.born);

  return calculateAverage(ages);
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
  // write code here
  let women = people.filter(person => {
    return person.sex === 'f';
  });

  women = withChildren
    ? women.filter((woman) => people.some((per) => per.mother === woman.name))
    : women;

  const averageAge = women.reduce((acc, elem) => {
    return acc + (elem.died - elem.born);
  }, 0) / women.length;

  return averageAge;
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
  const mothersArr = people.filter(person => {
    return people.some(elem => elem.name === person.mother);
  });

  const ageDiffs = mothersArr.map(mother => {
    const child = people.find(person => person.name === mother.mother);

    return child.born - mother.born;
  });

  if (onlyWithSon) {
    const sonsArr = people.filter(person => person.sex === 'm');
    const sonAgeDiffs = ageDiffs.filter((_, index) => {
      return sonsArr.includes(mothersArr[index]);
    });

    return Math.abs(calculateAverage(sonAgeDiffs));
  }

  return Math.abs(calculateAverage(ageDiffs));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
