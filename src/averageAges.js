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

function averageAgeFromArray(dataArrray) {
  return (
    dataArrray
      .map((yers) => yers.died - yers.born)
      .reduce((acc, curr) => acc + curr, 0) / dataArrray.length
  );
}

function calculateMenAverageAge(people, century) {
  const onlyMens = people.filter(({ sex }) => sex === 'm');
  const filterMens = onlyMens.filter(
    (men) => Math.ceil(men.died / 100) === century
  );

  const calculateAges = averageAgeFromArray(onlyMens);

  const calculateAgesInCentury = averageAgeFromArray(filterMens);

  return !century ? calculateAges : calculateAgesInCentury;
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
  const onlyWomen = people.filter(({ sex }) => sex === 'f');
  const womenWithChildren = onlyWomen.filter((woman) =>
    people.some((person) => person.mother === woman.name)
  );

  const calculateAges = averageAgeFromArray(onlyWomen);

  const calculateMother = averageAgeFromArray(womenWithChildren);

  return withChildren ? calculateMother : calculateAges;
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
  const onlyWomen = people.filter(({ sex }) => sex === 'f');
  const children = people.filter((child) => {
    const findChild = people.some((person) => child.mother === person.name);

    return onlyWithSon ? findChild && child.sex === 'm' : findChild;
  });

  const averageAges = children.map((person) => {
    const mother = onlyWomen.find((woman) => {
      return woman.name === person.mother;
    });

    return person.born - mother.born;
  });

  return averageAges.reduce((acc, val) => acc + val, 0) / averageAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
