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

import Fire, { PLayerFire, FireManager } from './Fire'
// import { Grid } from './map'

let fireController = new FireManager()

class Tank{
	constructor(x,y){
		const initAttr = {
			id: Date.now(),       //TODO: replace this with symbol
			ally: false,
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
			direction: 'w',   //0-3 for the clockwise direction
			key_down: false,        //the tank can run only when some key is pressed
			running: false,         //shows whether the tank is moving during key down
			now_fire: false,
			fire_time: 0,
		}
		merge(this, initAttr)
	}
}

export class Player extends Tank{
	constructor(...props){
		super(...props)
		const initAttr = {
			ally: true,
			type: "p1tankU",
			speed: 2,
			health: 5,
			damage: 5,
			key_down: false,        //the tank can run only when some key is pressed
			running: false,         //shows whether the tank is moving during key down
			now_fire: false,
			fire_time: 0,
		}
		merge(this, initAttr)
	}
	init(controller){
		this._listenKeyboard(controller)
	}
	_listenKeyboard(controller){
		this.direction = 'w'
		let that = this
		const listen = window.document.addEventListener
		//once player press down a button,we should
		listen('keydown',function (e) {

			switch (e.key){
				case 'w':
				case 's':
				case 'a':
				case 'd':
					that.direction = e.key
					that.key_down = true
					break
				case 'j':
					// that.key_down = true
					// that.now_fire = true
					if(Date.now() - that.fire_time > 500) {
						controller.addFire(new PLayerFire(that))
						that.fire_time = Date.now()
					}
					break
			}
		})
		listen('keyup',function (e) {
			that.key_down = false
		})
	}

	getAttacked(){
		this.health = 0
		console.log("Damaged")
	}
}

class Friend extends Tank{
	constructor(props){
		super(props)
		const initAttr = {
			ally: true,
			type: 2,
			speed: 2,
			health: 5,
			damage: 5
		}
		merge(this, initAttr)
	}
}

/**
 * Enemy tank types:
 *     speed | power | health
 *  0.  fast  normal   less
 *  1. normal normal  normal
 *  2. normal higher   more
 *  3. slow  one beat  highest
 *  4. normal normal  normal (always blinking and if destroy it, you can get useful items)
 */

export class Enemy extends Tank{
	constructor(...props){
		super(...props)
		const initAttr = {
			type: props[2] || props.type, //like this?
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
	changeDirection(reverse= false){
		if(reverse){
			this.direction = {'w':'s','s':'w','a':'d','d':'a'}[this.direction]
		}else {
			this.direction = "wasd"[Math.random()*4>>>0]
		}
	}
}

export class EnemyBase{

	constructor(base) {
		this.posX = base.x
		this.posY = base.y
		this.type = base.type
		this.count = 0                 //has born
		this.total = base.total || 5   //the number of tank that would be born here
		this.blinkStage = 0            //associated with bornPic
		this.frameCounter = 0          //enemy would born if fC % bI = 0
		this.bornInterval = 8 * Math.floor(Math.random() * 60 + 60)
	}
	bornOne(){
		if(this.count === this.total) return -1
		this.count ++
		return this
	}
	static get bornPic() {
		/**
		 * show 'born' picture step by step
		 */
		return [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4]
	}
}

export class EnemyController{

	constructor() {
		this.tankArr = []
	}
	addTank(enemy){
		this.tankArr.push(enemy)
	}
}

function merge(self, init) {
	for(let attr in init){
		if(init.hasOwnProperty(attr))
		self[attr] = init[attr]
	}
	return 1;
}