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
  const men = getBySex(people, 'm');

  const menDiedSelectCentury = men.filter(human => {
    const diedInSelectCentury = century
      ? Math.ceil(human.died / 100) === century
      : human.born;

    return diedInSelectCentury;
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
  const women = getBySex(people, 'f');
  const geWomenHasChildren = women.filter(human => {
    const hasChildren = withChildren
      ? people.some(children => children.mother === human.name)
      : human.born;

    return hasChildren;
  });
  const averageAge = getAverageAge(geWomenHasChildren);

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
    const chidrenIsSon = child.sex === 'm';

    return onlyWithSon
      ? hasMather && chidrenIsSon
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

function getBySex(people, sex) {
  return people.filter(human => human.sex === sex);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
