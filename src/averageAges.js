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
  if (century) {
    const mens = people.filter(function(human) {
      return human.sex === 'm'
        && Math.ceil(human.died / 100) === century;
    });
    const sumOfAges = mens.reduce(function(accum, men) {
      return +accum + men.died - men.born;
    }, 0);

    return sumOfAges / mens.length;
  } else {
    const mens = people.filter(function(human) {
      return human.sex === 'm';
    });
    const sumOfAges = mens.reduce(function(accum, men) {
      return accum + men.died - men.born;
    }, 0);

    return sumOfAges / mens.length;
  };

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with logical operators (&&, ||)
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  if (withChildren) {
    const womens = people.filter(function(human) {
      return human.sex === 'f'
        && people.find(function(child) {
          return child.mother === human.name;
        });
    });
    const sumOfAges = womens.reduce(function(accum, women) {
      return accum + women.died - women.born;
    }, 0);

    return sumOfAges / womens.length;
  } else {
    const womens = people.filter(function(human) {
      return human.sex === 'f';
    });
    const sumOfAges = womens.reduce(function(accum, women) {
      return accum + women.died - women.born;
    }, 0);

    return sumOfAges / womens.length;
  };
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  if (onlyWithSon) {
    const womens = people.filter(function(human) {
      return human.sex === 'f'
        && people.find(function(child) {
          return child.mother === human.name
            && child.sex === 'm';
        });
    });
    const children = people.filter(function(human) {
      return womens.find(function(mother) {
        return mother.name === human.mother && human.sex === 'm';
      });
    });

    const sumOfAges = children.reduce(function(accum, child) {
      return accum - womens.find(function(mother) {
        return mother.name === child.mother;
      }).born + child.born;
    }, 0);

    return sumOfAges / children.length;
  } else {
    const womens = people.filter(function(human) {
      return human.sex === 'f'
        && people.find(function(child) {
          return child.mother === human.name;
        });
    });

    const children = people.filter(function(human) {
      return womens.find(function(mother) {
        return mother.name === human.mother;
      });
    });

    const sumOfAges = children.reduce(function(accum, child) {
      return accum - womens.find(function(mother) {
        return mother.name === child.mother;
      }).born + child.born;
    }, 0);

    return sumOfAges / children.length;
  };
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
