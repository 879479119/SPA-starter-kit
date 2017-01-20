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
 * construction types:
 *  'v' - void area
 *  'b' - complete block
 *  'hbX' - half block, X represents an clockwise orientation(t,r,l,b)
 *  'g' - grass
 *  'w' - water
 *  's' - steel block
 *  'hsX' - half steel block, X is the same as 'hbX'
 *
 *
 */

/*
0.5px	|———————————|                   -2
	1px	|           |——————————  offset -1
	1px	|    4px    |                    0
	1px	|           |                    1
0.5px	|———————————|
	          ↑
	  single grid block
 */

//noinspection JSUnresolvedVariable
import { ImageManager } from './Manager'

const MAP_TEMPLATE = {
	size: {
		width: 10,
		height: 4
	},
	startPosition: [{
		x: 5,
		y: 3
	}],
	enemies: [
		{ x: 0, y: 0, type: 0, }
	],
	material: [
		['b','v','v','b'],
		['v','b','v','v'],
		['v','b','v','v'],
		['v','b','v','v']
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
		this.step = 4       //step means how many pixels tank goes when press button, it's like "control resolution ratio"
		this.gridBlock = 4  //a block consists of 16 pixels
		this.len = this.gridBlock * this.step

		//it's an Matrix which shows where the tanks could go
		this.alley = []
	}
	init(){
		this.c.clearRect(0,0,this.width,this.height)
		this.c.fillStyle = "#000"
		this.c.fillRect(0,0,this.width,this.height)
	}
	drawConstruction(){
		const mapSourceList = Map.getMapList(),
			{ size: { width, height}, material } = mapSourceList[0]
		let blocks = Grid._adaptor(material)

		for(let row = 0;row < height;row ++){
			for(let col = 0;col < width;col ++){
				this._drawBlock(col, row, blocks[col][row])
			}
		}

	}
	_drawTank(){
		const mapSourceList = Map.getMapList(),
			{ startPos : [{ x, y }], enemies } = mapSourceList[0]

		this._drawPlayer(x,y)
	}
	_drawPlayer(x, y){
		this._drawBlock(x, y, 'p1tankU')
	}
	_drawBlock(col, row, type, self){
		if(self === undefined) self = this
		let x = col * self.len,
			y = row * self.len,
			img = ImageManager.getBitMap(type)
		img && self.c.drawImage(img, x, y, self.len, self.len)
	}
	updateTank(tank){
		//in ideal situation(60Hz), the tank can go $speed*10 pixel one second
		let {posX, posY, offsetX, offsetY, speed, direction} = tank
		let move = speed * 10 / 60

		//TIP: because calculating pixel will cause some colored pixel left,
		//     so we just clear a double size of it
		let dummy = new DummyGrid()
		let degree = 0

		switch (true){
			case direction == 'w':
				if(offsetY <= 0){
					tank.posY --
					tank.offsetY = 15
				}else tank.offsetY = offsetY - move
				this._clearArea(posX,tank.posY,offsetX,tank.offsetY + 2 * move)
				degree = 0
				break
			case direction == 's':
				if(offsetY >= 15){
					tank.posY ++
					tank.offsetY = 0
				}else tank.offsetY = offsetY + move
				this._clearArea(posX,tank.posY,offsetX,tank.offsetY - 2 * move)
				degree = 180
				break
			case direction == 'a':
				if(offsetX <= 0){
					tank.posX --
					tank.offsetX = 15
				}else tank.offsetX = offsetX - move
				this._clearArea(tank.posX,posY,tank.offsetX + 2 * move,offsetY)
				degree = 270
				break
			case direction == 'd':
				if(offsetX >= 15){
					tank.posX ++
					tank.offsetX = 0
				}else tank.offsetX = offsetX + move
				this._clearArea(tank.posX,posY,tank.offsetX - 2 * move,offsetY)
				degree = 90
				break
		}


		this.c.drawImage(
			dummy._getRotateBlock('p1tankU',degree),
			tank.posX * this.len + tank.offsetX,
			tank.posY * this.len + tank.offsetY,
			this.len, this.len
		)
	}
	_clearArea(posX, posY, offsetX, offsetY){
		this.c.fillStyle = "#000"
		this.c.fillRect(posX * this.len + offsetX, posY * this.len + offsetY, this.len, this.len)
	}
	_geneAlley(material, width, height){
		let gridValid = []
		for(let row = 0;row < height;row ++){
			let rowArr1 = [],rowArr2 = []
			for(let col = 0;col < width;col ++){
				switch (material[row][col]){
					case 'v': case 'g':
						rowArr1.push(1,1);rowArr2.push(1,1)
						break
					case 'hbt': case 'hst':
						rowArr1.push(0,0);rowArr2.push(1,1)
						break
					case 'hbr': case 'hsr':
						rowArr1.push(1,0);rowArr2.push(1,0)
						break
					case 'hbb': case 'hsb':
						rowArr1.push(1,1);rowArr2.push(0,0)
						break
					case 'hbl': case 'hsl':
						rowArr1.push(0,1);rowArr2.push(0,1)
						break
					default:
						rowArr1.push(0,0);rowArr2.push(0,0)
						break
				}
			}
			//store the data and clear cache
			gridValid.push(rowArr1, rowArr2)
			rowArr1.length = 0
			rowArr2.length = 0
		}
		this.alley = gridValid
		return gridValid
	}
	static _adaptor(material){
		return material.map(k=>{
			return k.map(k=>Grid.materialData[k])
		})
	}
	//add all the blocks here
	static get materialData(){
		return {
			v: 0,
			b: "walls"
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
				console.log("what do you want?");
		}

		super._drawBlock(0,0,type,this)

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
