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
  const men = people.filter(({ sex, died }) => 
    century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm'
  );

  const resultMenAverageAge = men.reduce((totalAge, { born, died }) =>
    totalAge + died - born, 0
  ) / men.length;

  return resultMenAverageAge;
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
  const women = people.filter(
    person => person['sex'] === 'f'
  );

  let womenWithCheldren = women;

  if (withChildren === true) {
    womenWithCheldren = women.filter(
      function(woman) {
        let isMother = false;

        people.forEach(
          function(person) {
            if (woman.name === person.mother) {
              isMother = true;
            }
          }
        );

        return isMother;
      }
    );
  }

  const totalWomenAge = womenWithCheldren.reduce(
    (ageSum, person) => ageSum + person['died'] - person['born'], 0
  );

  const resultMenAverageAge = totalWomenAge / womenWithCheldren.length;

  return resultMenAverageAge;
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
  let possibleChildren = people;

  if (onlyWithSon === true) {
    possibleChildren = possibleChildren.filter(
      person => person['sex'] === 'm'
    );
  }

  const mothers = people.filter(
    function(possibleMother) {
      let isMother = false;

      possibleChildren.forEach(
        function(child) {
          if (possibleMother.name === child.mother) {
            isMother = true;
          }
        }
      );

      return isMother;
    }
  );

  let children = 0;

  const totalAgeDiff = mothers.reduce(
    function(sumAge, mother) {
      let diffForMother = 0;

      possibleChildren.forEach(
        function(child) {
          if (child.mother === mother.name) {
            children++;
            diffForMother += child.born - mother.born;
          }
        }
      );

      const totalAge = sumAge + diffForMother;

      return totalAge;
    }, 0
  );

  const resultAverageAgeDiff = totalAgeDiff / children;

  return resultAverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
