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
	constructor(x,y){
		const initAttr = {
			posX: x || 0,         //tank's position on axis X
			posY: y || 0,         //position on axis Y
			offsetX: 0,           //it's the atomic unit - 'px'
			offsetY: 0,           //that shows where the block is precisely
			type: 0,
			speed: 1,
			health: 5,
			defence: 0,      //decrease the damage
			shell: 0,        //shell may keep out some attack
			damage: 1,
			stage: 0,        //tank acts different
			direction: 0     //0-3 for the clockwise direction
		}
		merge(this, initAttr)
	}
}

export class Player extends Tank{
	constructor(props){
		super(props)
		const initAttr = {
			type: "p1tankU",
			speed: 2,
			health: 5,
			damage: 5,
			running: false         //shows whether the tank is moving during key down
		}
		merge(this, initAttr)
	}
	init(){
		this._listenKeyboard()
	}
	_listenKeyboard(){
		this.direction = 'w'
		let that = this
		const listen = window.document.addEventListener
		//once player press down a button,we should
		listen('keydown',function (e) {

			switch (e.key){
				case 'w'||'a'||'s'||'d':
					that.direction = e.key
					that.running = true
					break
			}
		})
		listen('keyup',function (e) {

			that.running = false
		})
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

export class Enemy extends Tank{
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

	_chaseUser(){
		/**
		 * when enemies chases users, the A* algorithm will take much time to find the way out,
		 * therefore, we should do the most complicated part only while user moves a step.
		 *
		 * Update: the tanks should not be so talent, they should choose a way and go straight till ending,
		 * but the ending of their travel cannot locate in anywhere except the 'base'
		 *
		 *
		 */
	}
}

function merge(self, init) {
	for(let attr in init){
		if(init.hasOwnProperty(attr))
		self[attr] = init[attr]
	}
	return 1;
}