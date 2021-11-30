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
  const callback = (startValue, obj) => {
    const age = obj.died - obj.born;

    return obj.sex === 'm' ? startValue + age : startValue;
  };
  const sumAges = people.reduce(callback, 0);

  const onlyM = people.filter(obj => {
    return obj.sex === 'm' ? obj : null;
  });
  const avarageAges = sumAges / onlyM.length;

  function callb(obj) {
    return obj.sex === 'm' && century === Math.ceil(obj.died / 100)
      ? obj : null;
  }

  const masivManInCentury = people.filter(callb);

  function f(start, x) {
    const agee = x.died - x.born;

    return start + agee;
  }

  const sumAgess = masivManInCentury.reduce(f, 0);
  const avarage = sumAgess / masivManInCentury.length;

  return century === undefined ? avarageAges : avarage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const callback = (startValue, obj) => {
    const ages = obj.died - obj.born;

    return obj.sex === 'f' ? startValue + ages : startValue;
  };
  const sum = people.reduce(callback, 0);

  const onlyF = people.filter((obj) => {
    return obj.sex === 'f' ? obj : null;
  });
  const avarageAges = sum / onlyF.length;

  const onlyWomans = people.filter((x) => x.sex === 'f');

  const callb = (obj) => {
    const callbb = (obj1) => {
      return obj.name === obj1.mother ? obj : null;
    };

    const x = people.find(callbb);

    return x;
  };

  const onlyWomansWithChildrens = onlyWomans.filter(callb);

  const func = (startValue, obj) => {
    const ages = obj.died - obj.born;

    return startValue + ages;
  };

  const sumAges = onlyWomansWithChildrens.reduce(func, 0);

  const avarage = sumAges / onlyWomansWithChildrens.length;

  return withChildren === undefined ? avarageAges : avarage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const callback = (obj) => {
    const callbb = (obj1) => {
      obj.diff = obj.born - obj1.born;

      return obj.mother === obj1.name ? obj : null;
    };

    const x = people.find(callbb);

    return x;
  };

  const onlyChildren = people.filter(callback);

  const f = (startValue, obj) => {
    const ages = obj.diff;

    return startValue + ages;
  };

  const sumAges = onlyChildren.reduce(f, 0);

  const avarageAges = sumAges / onlyChildren.length;

  const onlyWomans = people.filter((x) => x.sex === 'f');
  const onlyMans = people.filter((x) => x.sex === 'm');

  const callb = (obj) => {
    const callbbb = (obj1) => {
      obj.diff = obj.born - obj1.born;

      return obj.mother === obj1.name ? obj : null;
    };

    const y = onlyWomans.find(callbbb);

    return y;
  };

  const onlyChildrenn = onlyMans.filter(callb);

  const func = (startValue, obj) => {
    const ages = obj.diff;

    return startValue + ages;
  };

  const sumAgess = onlyChildrenn.reduce(func, 0);

  const avarage = sumAgess / onlyChildrenn.length;

  return onlyWithSon === undefined ? avarageAges : avarage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
