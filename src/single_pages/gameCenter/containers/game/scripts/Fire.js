/**
 * Created by zi on 2017/1/20.
 */
export default class Fire{
	constructor(tank) {
		if(tank === undefined) throw Error('Fire cannot be created without direction')
		const {direction, posX, posY, offsetX, offsetY} = tank
		this.speed = 5
		this.type = 'ball'
		this.size = 4         //pixels that a ball consists
		this.from_ally = false
		this.posX = posX
		this.posY = posY
		this.offsetX = offsetX
		this.offsetY = offsetY
		this.direction = direction

		this.accuracyX = posX * 8 + offsetX + 6    //the right position where we draw a ball based on pos and offset
		this.accuracyY = posY * 8 + offsetY + 6
		switch (direction){
			case "w": this.accuracyY -= 8;break
			case "s": this.accuracyY += 8;break
			case "a": this.accuracyX -= 8;break
			case "d": this.accuracyX += 8;break
		}
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
	fireGone(index){
		this.fireArr.splice(index,1)
	}
}