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
  if (century === undefined) {
    const callback = (startValue, obj) => {
      if (obj.sex === 'm') {
        const age = obj.died - obj.born;

        return startValue + age;
      }

      return startValue;
    };

    const sumAges = people.reduce(callback, 0);

    const onlyMan = (obj) => {
      if (obj.sex === 'm') {
        return obj;
      }
    };

    const onlyM = people.filter(onlyMan);
    const avarageAges = sumAges / onlyM.length;

    return avarageAges;
  }

  function callb(obj) {
    if (obj.sex === 'm' && century === Math.ceil(obj.died / 100)) {
      return obj;
    }
  }

  const masivManInCentury = people.filter(callb);

  function f(start, x) {
    const agee = x.died - x.born;

    return start + agee;
  }

  const sumAgess = masivManInCentury.reduce(f, 0);
  const avarage = sumAgess / masivManInCentury.length;

  return avarage;
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
  if (withChildren === undefined) {
    const callback = (startValue, obj) => {
      if (obj.sex === 'f') {
        const ages = obj.died - obj.born;

        return startValue + ages;
      }

      return startValue;
    };
    const sum = people.reduce(callback, 0);

    const x = (obj) => {
      if (obj.sex === 'f') {
        return obj;
      }
    };
    const onlyF = people.filter(x);
    const avarageAges = sum / onlyF.length;

    return avarageAges;
  } else {
    const onlyWomans = people.filter((x) => x.sex === 'f');

    const callback = (obj) => {
      const name = obj.name;

      for (let i = 0; i < people.length; i++) {
        const objj = people[i];

        if (name === objj.mother) {
          return obj;
        }
      }
    };

    const onlyWomansWithChildrens = onlyWomans.filter(callback);

    const func = (startValue, obj) => {
      const ages = obj.died - obj.born;

      return startValue + ages;
    };

    const sumAges = onlyWomansWithChildrens.reduce(func, 0);

    const avarageAges = sumAges / onlyWomansWithChildrens.length;

    return avarageAges;
  }
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
  if (onlyWithSon === undefined) {
    const callback = (obj) => {
      const name = obj.mother;

      for (let i = 0; i < people.length; i++) {
        const objj = people[i];

        if (name === objj.name) {
          obj.diff = obj.born - objj.born;

          return obj;
        }
      }
    };

    const onlyChildren = people.filter(callback);

    const func = (startValue, obj) => {
      const ages = obj.diff;

      return startValue + ages;
    };

    const sumAges = onlyChildren.reduce(func, 0);

    const avarageAges = sumAges / onlyChildren.length;

    return avarageAges;
  } else {
    const onlyWomans = people.filter((x) => x.sex === 'f');
    const onlyMans = people.filter((x) => x.sex === 'm');

    const callback = (obj) => {
      const name = obj.mother;

      for (let i = 0; i < onlyWomans.length; i++) {
        const objj = onlyWomans[i];

        if (name === objj.name) {
          obj.diff = obj.born - objj.born;

          return obj;
        }
      }
    };

    const onlyChildren = onlyMans.filter(callback);

    const func = (startValue, obj) => {
      const ages = obj.diff;

      return startValue + ages;
    };

    const sumAges = onlyChildren.reduce(func, 0);

    const avarageAges = sumAges / onlyChildren.length;

    return avarageAges;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
