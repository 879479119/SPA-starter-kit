/**
 * Created by zi on 2017/1/13.
 */

/**
 * we may need tanks count between 1 and 10
 * our tank, alis and enemies extend class Tank
 */

/**
 * User tank types:
 *  0. faster than other kinds of tanks with less power
 *  1. start with a shell which will cover after a while since broken
 *  2. tank with more powerful cannon which may break the irony wall
 *  3.
 */

/**
 * Enemy tank types:
 *     speed | power | health
 *  0.  fast  normal   less
 *  1. normal normal  normal
 *  2. normal higher   more
 *  3. slow  one beat  highest
 *  4. normal normal  normal (always blinking and if destroy it, you can get useful items)
 */

class Tank{
	constructor(){
		const initAttr = {
			posX: 0,         //tank's position on axis X
			posY: 0,         //position on axis Y
			type: 0,
			speed: 1,
			health: 5,
			defence: 0,      //decrease the damage
			shell: 0,        //shell may keep out some attack
			damage: 1,
			stage: 0,        //tank acts different
		}
		merge(this, initAttr)
	}
}

class Player extends Tank{
	constructor(props){
		super(props)
		const initAttr = {
			type: 1,
			speed: 2,
			health: 5,
			damage: 5
		}
		merge(this, initAttr)
	}
}

class Friend extends Tank{
	constructor(props){
		super(props)
		const initAttr = {
			type: 2,
			speed: 2,
			health: 5,
			damage: 5
		}
		merge(this, initAttr)
	}
}

class Enemy extends Tank{
	constructor(props){
		super(props)
		const initAttr = {
			type: 0,
			speed: 1,
			health: 5,
			damage: 1
		}
		merge(this, initAttr)
	}
}

function merge(self, init) {
	for(let attr of init){
		self[attr] = init[attr]
	}
	return 1;
}