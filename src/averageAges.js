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
  const menOfPeople = people.filter(
    oneOfPeople =>
      century
        ? (oneOfPeople.sex === 'm'
          && century === Math.ceil(oneOfPeople.died / 100))
        : oneOfPeople.sex === 'm'
  );

  const menAges = menOfPeople.map(man => man.died - man.born);
  const averageMenAges = menAges.reduce((a, b) => a + b) / menAges.length;

  return averageMenAges;
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
  const womenOfPeople = people.filter(
    oneOfPeople =>
      withChildren
        ? oneOfPeople.sex === 'f'
          && people.some(one => one.mother === oneOfPeople.name)
        : oneOfPeople.sex === 'f'
  );

  const womenAges = womenOfPeople.map(woman => woman.died - woman.born);
  const averageWomenAges = womenAges.reduce((a, b) => a + b) / womenAges.length;

  return averageWomenAges;
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
  const children = people.filter(oneOfPeople => {
    const isValidMother = oneOfPeople.mother
      && people.some(one => one.name === oneOfPeople.mother);

    return onlyWithSon
      ? isValidMother
      && oneOfPeople.sex === 'm'
      : isValidMother;
  }
  );

  const ageDiffs = children.map(child => {
    const mother = people.find(
      oneOfPeople => child.mother === oneOfPeople.name
    );

    const ageDiff = child.born - mother.born;

    return ageDiff;
  });

  return ageDiffs.reduce((prev, curr) =>
    prev + curr
  ) / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
