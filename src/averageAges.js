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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filterMan = !century
    ? people.filter(human => human.sex === 'm')
    : people.filter(human =>
      Math.ceil(human.died / 100) === century && human.sex === 'm');

  const menAge = filterMan.map(human => human.died - human.born);

  const averageAge = menAge.reduce((a, b) => a + b) / menAge.length;

  return averageAge;
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
  const mothersList = people.map(human => human.mother);

  const mothersWithChildrens = people.filter(human =>
    mothersList.includes(human.name)
  );

  const filterWoman = !withChildren
    ? people.filter(human => human.sex === 'f')
    : mothersWithChildrens;

  const womenAge = filterWoman.map(human => human.died - human.born);

  const averageAge = womenAge.reduce((a, b) => a + b) / womenAge.length;

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
  const mothersList = people.map(human => human.mother);

  const mothersWithChildrens = people.filter(human =>
    mothersList.includes(human.name)
  );

  const mothersNames = mothersWithChildrens.map(human => human.name);

  const kidsHasMothers = !onlyWithSon
    ? people.filter(human => mothersNames.includes(human.mother))
    : people.filter(human => mothersNames.includes(human.mother)
      && human.sex === 'm');

  const mothers = {};

  mothersWithChildrens.map(function(human) {
    mothers[human.name] = human.born;
  });

  const ageDiff = kidsHasMothers.map(human =>
    human.born - mothers[human.mother]);

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
