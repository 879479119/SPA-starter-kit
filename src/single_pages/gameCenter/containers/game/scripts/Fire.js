/**
 * Created by zi on 2017/1/20.
 */
export default class Fire{

	constructor(tank) {
		if(tank === undefined) throw Error('Fire cannot be created without direction')
		const {direction, posX, posY, offsetX, offsetY} = tank
		this.speed = 2
		this.type = 'ball'
		this.size = 4         //pixels that a ball consists
		this.from_ally = false
		this.posX = posX
		this.posY = posY
		this.offsetX = offsetX
		this.offsetY = offsetY
		this.direction = direction

		this.accuracyX = undefined    //the right position where we draw a ball based on pos and offset
		this.accuracyY = undefined
	}

}

export class PLayerFire extends Fire{

	constructor(props) {
		super(props)
		this.from_ally = true
	}
}

export class FireManager{

	constructor() {
		this.fireArr = []
	}

	addFire(fireObj){
		this.fireArr.push(fireObj)
	}
}