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
  const rigthCentury = (person) => {
    return Math.ceil(person.died / 100) === century;
  };

  const suitableMen = people
    .filter(person => {
      const isMan = person.sex === 'm';

      return isMan
        && (
          century ? rigthCentury(person) : true
        );
    });

  const menAgesSum = suitableMen
    .reduce((prev, { born, died }) => {
      return prev + (died - born);
    }, 0);

  return calculateAverage(menAgesSum, suitableMen.length) || 0;
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
  const haveChild = (person, arr) => {
    return arr.some(child => child.mother === person.name);
  };

  const suitableWoman = people.filter((person, idx, arr) => {
    const isWoman = person.sex === 'f';

    return isWoman
    && (
      withChildren ? haveChild(person, arr) : true
    );
  });

  const womenAgesSum = suitableWoman
    .reduce((prev, { born, died }) => {
      const ages = (died - born);

      return prev + ages;
    }, 0);

  return calculateAverage(womenAgesSum, suitableWoman.length);
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
  const findMother = (group, person) => {
    const mother = group.find(mthr => mthr.name === person.mother);

    return mother;
  };

  const children = people.filter((person) => {
    const isWoman = person.sex === 'm';
    const hasMother = findMother(people, person) !== undefined;

    return hasMother && (
      onlyWithSon ? isWoman : true
    );
  });

  const ageDiffSum = children
    .reduce((prev, person) => {
      const ageDiff = person.born - findMother(people, person).born;

      return prev + ageDiff;
    }, 0);

  return calculateAverage(ageDiffSum, children.length);
}

function calculateAverage(array, length) {
  return array / length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
