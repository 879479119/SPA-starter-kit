/**
 * Created by zi on 2017/1/13.
 */

/**
 * methods started with character 'u' mean this works for user
 */

/**
 * the canvas is divided into lots of pieces called 'block',
 * and one block consists of 16 step boxes,
 * a step box is made up of 2 * 2 pixel square.
 *
 * for tanks,it can go several steps instead of pixel,
 * you can simply get an idea that passing a block needs four steps.
 *
 * since the canvas does need to draw from head to toe,we just clear
 * the area needed to save time for complication of calculation
 */

/**
 * there is three types of 'small blocks':
 *  0 - void, fire & tank could pass, e.g: VOID
 *  1 - void, fire & tank could pass, e.g: GRASS
 *  2 - unreachable, fire can pass, but tank doesn't, e.g: WATER
 *  3 - hard, only level 3 fire can destroy, e.g: STEEL
 *  4 - destroyable, fire can destroy, e.g: BLOCK
 */

//noinspection JSUnresolvedVariable
import { ImageManager } from './Manager'

const MAP_TEMPLATE = {
	size: {
		width: 12,
		height: 8
	},
	startPosition: [{
		x: 2,
		y: 2
	}],
	enemies: [
		{ x: 0, y: 0, type: 0, }
	],
	material: [
		[0,0,1,1,0,0,0,0,0,0,0,0,],
		[0,0,1,1,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,4,4,0,0,],
		[0,0,0,0,2,2,0,0,4,4,0,0,],
		[0,0,0,0,2,2,0,0,0,0,0,0,],
		[0,0,0,0,3,3,0,0,4,4,0,0,],
		[0,0,0,0,3,3,0,0,4,4,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,],
	]
}

/**
 * the class grid controls the canvas,and store some data
 */
export class Grid{
	constructor(width, height){
		/*the canvas must be width 800px,height 400px*/
		this.width = width || 800
		this.height = height || 400
		this.ele = window.document.querySelector("#canvas")
		this.c = this.ele.getContext('2d')
		this.step = 8       //step means how many pixels tank goes when press button, it's like "control resolution ratio"
		this.gridBlock = 2  //a block consists of 16 pixels
		this.len = this.gridBlock * this.step

		//it's an Matrix which shows where the tanks could go
		this.alley = []
	}

	/*basic methods*/
	init(){
		// this.c.clearRect(0,0,this.width,this.height)
		this.c.fillStyle = "#000"
		this.c.fillRect(0,0,this.width,this.height)
	}
	_drawBlock(row, col, type, self){
		if(self === undefined) self = this
		let x = col * self.step,
			y = row * self.step,
			img = ImageManager.getBitMap(type)
		img && self.c.drawImage(img, x, y, self.step, self.step)
	}
	_drawGaintBlock(col, row, type, self){
		if(self === undefined) self = this
		let x = col * self.len,
			y = row * self.len,
			img = ImageManager.getBitMap(type)
		img && self.c.drawImage(img, x, y, self.len, self.len)
	}
	_clearArea(posX, posY, offsetX, offsetY){
		this.c.fillStyle = "#000"
		this.c.fillRect(posX * this.len + offsetX, posY * this.len + offsetY, this.len, this.len)
	}
	_geneAlley(){
		const material = this.material,
			width = material[0].length,
			height = material.length
		let gridValid = []

		/**
		 * there is three types of 'small blocks':
		 *  0 - void, fire & tank could pass, e.g: VOID
		 *  1 - void, fire & tank could pass, e.g: GRASS
		 *  2 - unreachable, fire can pass, but tank doesn't, e.g: WATER
		 *  3 - hard, only level 3 fire can destroy, e.g: STEEL
		 *  4 - destroyable, fire can destroy, e.g: BLOCK
		 */


		for(let row = 0;row < height;row ++){
			let rowArr = []

			for(let col = 0;col < width;col ++){
				if (material[row][col] === 0 || material[row][col] === 1){
					rowArr.push(1)
				}else {
					rowArr.push(0)
				}
			}

			//store the data and clear cache
			//TIP: I used to write like 'gridValid.push(rowArr1, rowArr2)', grid gets the references instead
			//     once set rowArr.length to 0, grid turns to be void
			gridValid.push([...rowArr])
			rowArr.length = 0
		}
		this.alley = gridValid
		return gridValid
	}

	/*some special methods*/
	_drawTank(){
		const mapSourceList = Map.getMapList(),
			{ startPosition : [{ x, y }], enemies } = mapSourceList[0]

		this._drawPlayer(x,y)
	}
	_drawPlayer(x, y){
		this._drawGaintBlock(x, y, 'p1tankU')
	}
	_drawFire(x, y, size = 4){
		let	img = ImageManager.getBitMap('ball2')
		img && this.c.drawImage(img, x, y, size, size)
	}
	/*export methods*/
	getAlley(init = false){
		if(init) this._geneAlley()
		else return this.alley
	}
	drawConstruction(){
		const mapSourceList = Map.getMapList(),
			{ size: { width, height}, material } = mapSourceList[0]
		this.material = material
		let blocks = Grid._adaptor(material)

		for(let row = 0;row < height;row ++){
			for(let col = 0;col < width;col ++){
				this._drawBlock(row, col, blocks[row][col])
			}
		}

	}
	updateTank(tank, run = false){
		//in ideal situation(60Hz), the tank can go $speed*10 pixel one second
		let {posX, posY, offsetX, offsetY, speed, direction} = tank
		let move = speed * 10 / 60

		//TIP: DummyGrid is a canvas buffer which provides a transformed image
		let dummy = new DummyGrid()
		let degree = 0

		if(run === false){
			//interesting usage
			let d = [0,90,180,270]['wdsa'.indexOf(direction)]

			this.c.drawImage(
				dummy._getRotateBlock('p1tankU',d),
				posX * this.step + offsetX,
				posY * this.step + offsetY,
				this.len, 16
			)
			return
		}

		switch (true){
			case direction == 'w':
				if(offsetY <= 0){
					tank.posY --
					tank.offsetY = 8
				}else tank.offsetY = offsetY - move
				//TIP: because calculating pixel will cause some colored pixel left,
				//     so we just clear a double size of it
				// this._clearArea(posX,tank.posY,offsetX,tank.offsetY + 2 * move)
				degree = 0
				break
			case direction == 's':
				if(offsetY >= 8){
					tank.posY ++
					tank.offsetY = 0
				}else tank.offsetY = offsetY + move
				// this._clearArea(posX,tank.posY,offsetX,tank.offsetY - 2 * move)
				degree = 180
				break
			case direction == 'a':
				if(offsetX <= 0){
					tank.posX --
					tank.offsetX = 8
				}else tank.offsetX = offsetX - move
				// this._clearArea(tank.posX,posY,tank.offsetX + 2 * move,offsetY)
				degree = 270
				break
			case direction == 'd':
				if(offsetX >= 8){
					tank.posX ++
					tank.offsetX = 0
				}else tank.offsetX = offsetX + move
				// this._clearArea(tank.posX,posY,tank.offsetX - 2 * move,offsetY)
				degree = 90
				break
		}
		this.c.drawImage(
			dummy._getRotateBlock('p1tankU',degree),
			tank.posX * this.step + tank.offsetX,
			tank.posY * this.step + tank.offsetY,
			this.len, 16
		)
	}
	updateFire(fireC){
		// console.log(fireC.fireArr)
		if(fireC.fireArr.length === 0) return
		//TIP: to make sure there is least calculation, the code is redundant
		const { len } = this
		this.c.fillStyle = "#000"
		for(let fire of fireC.fireArr){
			let { direction, posX, posY, offsetX, offsetY, speed, size } = fire
			speed = speed / 5
			switch (direction){
				case "w":
					if(fire.accuracyX === undefined){
						fire.accuracyX = posX * len + offsetX + len / 2 - size / 2
						fire.accuracyY = posY * len + offsetY - size
					}else {
						this.c.fillRect(fire.accuracyX,fire.accuracyY + 1,size,size)
						this._drawFire(fire.accuracyX,fire.accuracyY,size)
						fire.accuracyY -= speed
					}
					break
				case "s":
					if(fire.accuracyX === undefined){
						fire.accuracyX = posX * len + offsetX + len / 2 - size / 2
						fire.accuracyY = posY * len + offsetY + len
					}else {
						this.c.fillRect(fire.accuracyX,fire.accuracyY - 1,size,size)
						this._drawFire(fire.accuracyX,fire.accuracyY,size)
						fire.accuracyY += speed
					}
					break
				case "a":
					if(fire.accuracyX === undefined){
						fire.accuracyX = posX * len + offsetX - size
						fire.accuracyY = posY * len + offsetY + len / 2 - size / 2
					}else {
						this.c.fillRect(fire.accuracyX + 1,fire.accuracyY,size,size)
						this._drawFire(fire.accuracyX,fire.accuracyY,size)
						fire.accuracyX -= speed
					}
					break
				case "d":
					if(fire.accuracyX === undefined){
						fire.accuracyX = posX * len + offsetX + len + size
						fire.accuracyY = posY * len + offsetY + len / 2 - size / 2
					}else {
						this.c.fillRect(fire.accuracyX - 1,fire.accuracyY,size,size)
						this._drawFire(fire.accuracyX,fire.accuracyY,size)
						fire.accuracyX += speed
					}
					break
				default:
					throw Error("WRONG DIRECTION")
			}
		}
	}
	destroyBlock(col, row){
		this.alley[col][row] = 1
	}
	static _adaptor(material){
		return material.map(k=>{
			return k.map(k=>Grid.materialData[k])
		})
	}
	//add all the blocks here
	static get materialData(){
		return {
			0: 0,
			1: "gra",
			2: "wate",
			3: "stee",
			4: "wall"
		}
	}
}

export class  DummyGrid extends Grid{

	constructor(width, height) {
		super(width, height);
		this.width = 16
		this.height = 16
		this.len = 16
		this.init()
	}

	init() {
		this.ele = window.document.createElement("canvas")
		this.ele.width = this.width
		this.ele.height = this.height
		this.c = this.ele.getContext('2d')
	}

	_getRotateBlock(type, degree){
		this.c.clearRect(0,0,this.len,this.len)
		//we must draw the bitmap on 'this.c' ,so just take this as a param
		this.c.save()

		switch (degree){
			case 90:
				this.c.translate(this.len, 0)
				this.c.rotate(Math.PI/2)
				break
			case 180:
				this.c.translate(this.len, this.len)
				this.c.rotate(Math.PI)
				break
			case 270:
				this.c.translate(0, this.len)
				this.c.rotate(-Math.PI/2)
				break
			default:
				console.log("what do you want? ");
		}

		super._drawGaintBlock(0,0,type,this)

		this.c.restore()
		return this.ele
	}
}

export default class Map extends Grid{
	constructor(width, height){
		super(width, height)
		this.width = width
		this.height =height
		//this prop shows how the block damaged
		this.blockStatus = []
	}
	//init the map
	init(){

	}
	draw(){
		return this.blockStatus
	}
	_geneStatus(material){
		// 1 represent this position is accessible,
		// 0 represent other position with entity
		const REFLECT = {
			v: 1, g: 1
		}
		return this.blockStatus = material.map(k=>{
			return k.map(k=>REFLECT[k] || 0)
		})
	}
	/**
	 * draw map using an object 'map'
	 * @param map Object
	 * @private
	 */
	_drawMap(map){

	}
	//draw from local storage
	static getMapList(){
		let maps = window.localStorage.getItem('mapList')
		return JSON.parse(maps)
	}
	insertMap(){

	}
}
