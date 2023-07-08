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
  const men = people
    .filter(
      human =>
        century
          ? (human.sex === 'm' && Math.ceil(human.died / 100) === century)
          : human.sex === 'm'
    );

  const menAverageAge = averageAge(men, man => man.died - man.born);

  return menAverageAge;
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
  const women = people
    .filter(
      human =>
        withChildren
          ? human.sex === 'f'
            && people.some(person => (person.mother === human.name))
          : human.sex === 'f'
    );

  const womenAverageAge = averageAge(women, woman => woman.died - woman.born);

  return womenAverageAge;
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
  const children = people
    .filter(
      human =>
        onlyWithSon
          ? people.find(person => (human.mother === person.name
          && human.sex === 'm'))
          : people.find(person => (human.mother === person.name))
    );

  const childrenAverageBirthYear = averageAge(children, child => child.born);

  const mothersAverageBornYear = averageAge(children,
    child => people.find(human => human.name === child.mother).born);

  return childrenAverageBirthYear - mothersAverageBornYear;
}

function averageAge(arr, callback) {
  return arr.map(callback).reduce((sum, x) => sum + x, 0) / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
