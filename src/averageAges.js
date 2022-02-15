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
  const onlyMan = people.filter(obj => {
    return century
      ? (century === Math.ceil(obj.died / 100) && obj.sex === 'm' ? obj : null)
      : obj.sex === 'm' ? obj : null;
  }
  );

  const sumAge = onlyMan.reduce((startValue, obj) => {
    const age = obj.died - obj.born;

    return startValue + age;
  }, 0);

  return sumAge / onlyMan.length;
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
  const getOnlyWoman = (obj) => {
    const getWithChildren = (peopleObj) => {
      return obj.name === peopleObj.mother ? obj : null;
    };
    const womanWithChildren = people.find(getWithChildren);

    return obj.sex === 'f' ? (withChildren ? womanWithChildren : obj) : null;
  };

  const onlyWoman = people.filter(getOnlyWoman);

  const getSumAge = (startValue, obj) => {
    const age = obj.died - obj.born;

    return startValue + age;
  };

  const sumAges = onlyWoman.reduce(getSumAge, 0);

  return sumAges / onlyWoman.length;
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
  const callback = (childObj) => {
    const getMothers = (obj) => {
      childObj.diff = childObj.born - obj.born;

      const result = childObj.mother === obj.name ? obj : null;

      return onlyWithSon ? (childObj.sex === 'm' ? result : null) : result;
    };

    const mother = people.find(getMothers);

    return mother;
  };

  const onlyMothers = people.filter(callback);

  const getSumAge = (startValue, obj) => {
    const ages = obj.diff;

    return startValue + ages;
  };

  const sumAges = onlyMothers.reduce(getSumAge, 0);

  return sumAges / onlyMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
