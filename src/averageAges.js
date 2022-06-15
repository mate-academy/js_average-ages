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
  const menDiedSelectCentury = people.filter(human => {
    const sexIsMale = human.sex === 'm';
    const diedInSelectCentury = century
      ? Math.ceil(human.died / 100) === century
      : human.born;

    return (sexIsMale && diedInSelectCentury);
  });

  const averageAge = getAverageAge(menDiedSelectCentury);

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
  const womenHasChildren = people.filter(human => {
    const sexIsFemale = human.sex === 'f';
    const hasChildren = withChildren
      ? people.some(children => children.mother === human.name)
      : human.born;

    return (sexIsFemale && hasChildren);
  });
  const averageAge = getAverageAge(womenHasChildren);

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
  const children = people.filter(child => {
    const hasMather = people.some(mather => child.mother === mather.name);
    const sexIsMale = child.sex === 'm';

    return onlyWithSon
      ? hasMather && sexIsMale
      : hasMather;
  });

  const averageAge = children.reduce((sum, humanData) => {
    const hisMather = people.find(childMather =>
      humanData.mother === childMather.name
    );
    const age = humanData.born - hisMather.born;

    return sum + age;
  }, 0) / children.length;

  return averageAge;
}

function getAverageAge(datalist) {
  return datalist.reduce((prevSum, humanData) => {
    const age = humanData.died - humanData.born;

    return prevSum + age;
  }, 0) / datalist.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
