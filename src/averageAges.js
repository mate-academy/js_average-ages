'use strict';
/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const averageAgeCalculate = function(ages) {
  const averageAge = ages.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  return averageAge / ages.length;
};

function motherAndSonDiff(people) {
  return people.reduce((sum, age) => {
    return sum + (age.born - age.motherInfo);
  }, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const menArray = people.filter((man) => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm'
  );

  return averageAgeCalculate(menArray);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenArray = people.filter((woman) => withChildren
    ? woman.sex === 'f' && people.find((motherName) =>
      motherName.mother === woman.name)
    : woman.sex === 'f'
  );

  return averageAgeCalculate(womenArray);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const withMother = people.map((person) => {
    return {
      ...person,
      motherInfo:
        people
          .filter((mother) => mother.name === person.mother)
          .map((motherBorn) => motherBorn.born)
          .find((dateOfBorn) => dateOfBorn),
    };
  })
    .filter(bithday => bithday.motherInfo);

  const withSon = withMother.filter(person => person.sex === 'm');

  return onlyWithSon
    ? motherAndSonDiff(withSon)
    : motherAndSonDiff(withMother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
