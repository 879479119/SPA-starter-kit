/**
 * Created by RockSAMA on 2017/1/13.
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
import { EnemyBase } from './tank'

const MAP_TEMPLATE = {
	size: {
		width: 36,
		height: 22
	},
	startPosition: [{
		x: 2,
		y: 2
	}],
	enemies: [
		{ x: 0, y: 0, type: [3,4] },
		{ x: 15, y: 9, type: [0,1,2,3,4] },
		{ x: 30, y: 14, type: [0,1,2] },
	],
	material: [
		[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,0,0,2,2,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,3,3,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,3,3,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,],
	]
}

//localStorage.setItem('mapList',JSON.stringify([MAP_TEMPLATE]))

export class Canvas{
	constructor(dom){

		this.sX = 0
		this.sY = 0
		this.oX = 0
		this.oY = 0
		//the params that we use to draw
		this.endCol = 0
		this.endRow = 0

		//create a new canvas and set some attributes
		this.ele = document.createElement("canvas")
		this.ele.width = dom.width
		this.ele.height = dom.height
		this.ele.style.position = "absolute"
		this.ele.style.left = 0
		this.ele.style.top = 0
		document.querySelector("#canvas-container").appendChild(this.ele)

		this.c = this.ele.getContext('2d')
	}
	setOffset(oX,oY){
		this.oX = oX
		this.oY = oY
	}
	startSelection(col, row){
		console.log(col,row);
		this.sX = col
		this.sY = row
	}
	drawSelection(col, row){
		const { oX, oY, sX, sY } = this
		this.c.clearRect(0,0,this.ele.width,this.ele.height)
		this.c.fillStyle = "rgba(255,255,255,0.5)"
		this.c.fillRect(oX+sX*8,oY+sY*8,(col-sX)*8,(row-sY)*8)

		//TIP: the selection tool sometimes is not the same as what we draw
		//therefore, we can store the status in memory
		this.endCol = col
		this.endRow = row
	}
	clearSelection(){
		this.c.clearRect(0,0,this.ele.width,this.ele.height)
	}
}

/**
 * the class grid controls the canvas,and store some data
 */
export class Grid{
	constructor(width, height){
		localStorage.setItem('mapList',JSON.stringify([MAP_TEMPLATE]))
		/*the canvas must be width 800px,height 400px*/
		this.width = width || 800
		this.height = height || 400
		this.ele = window.document.querySelector("#canvas")
		this.c = this.ele.getContext('2d')
		this.step = 8       //step means how many pixels tank goes when press button, it's like "control resolution ratio"
		this.gridBlock = 2  //a block consists of 16 pixels
		this.len = this.gridBlock * this.step

		this.oX = 0
		this.oY = 0

		//it's an Matrix which shows where the tanks could go
		this.alley = []

		const mapSourceList = Map.getMapList(),
			{ material } = mapSourceList[0]
		this.map = mapSourceList[0]
		this.material = material

	}
	/*basic methods*/
	init(){
		// this.c.clearRect(0,0,this.width,this.height)
		this.c.fillStyle = "#000"
		this.c.fillRect(0,0,this.width,this.height)
		this.dummyGrid = new DummyGrid()
	}
	_drawBlock(row, col, type, self){
		if(self === undefined) self = this
		let x = col * self.step + this.oX,
			y = row * self.step + this.oY,
			img = ImageManager.getBitMap(type)
		img && self.c.drawImage(img, x, y, self.step, self.step)
	}
	_drawGiantBlock(col, row, type, self, accuracy= false){
		if(self === undefined) self = this
		let x = accuracy ? col : col * self.step,
			y = accuracy ? row : row * self.step,
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
			{ startPosition : [{ x, y }] } = mapSourceList[0]

		this._drawPlayer(x,y)
	}
	_drawPlayer(x, y){
		this._drawGiantBlock(x, y, 'p1tankU')
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

		const { size: { width, height} } = this.map,
			material = this.material

		let blocks = Grid._adaptor(material)

		for(let row = 0;row < height;row ++){
			for(let col = 0;col < width;col ++){
				this._drawBlock(row, col, blocks[row][col])
			}
		}

	}
	updateEnemy(enemy){
		this.updateTank(enemy)
	}
	birthAnimation(enemyBase, init= false){
		if(init === true) enemyBase.blinkStage = 0
		let { posX, posY, blinkStage } = enemyBase
		this._drawGiantBlock(posX,posY,"born"+EnemyBase.bornPic[blinkStage],this)
		enemyBase.blinkStage ++
	}
	blastAnimation(tank, init= false){
		//TODO: blast animation
		if(init === true) tank.deadStage = 1
		else tank.deadStage ++
		const { posX, posY, offsetX, offsetY } = tank
		let aX = posX * this.step + offsetX
		let aY = posY * this.step + offsetY
		this._drawGiantBlock(aX,aY,"blast"+tank.deadStage,this,true)
	}
	updateTank(tank, run = false){
		//in ideal situation(60Hz), the tank can go $speed*10 pixel one second
		let {posX, posY, offsetX, offsetY, speed, direction, type, ally} = tank
		let move = speed * 10 / 60
		let tankName = ally ? 'p1tankU' : ['p1tankU','enemy1','enemy2','enemy3','p2tankF'][type]

		//TIP: DummyGrid is a canvas buffer which provides a transformed image
		let dummy = this.dummyGrid
		let degree = 0

		if(run === false){
			//interesting usage
			let d = [0,90,180,270]['wdsa'.indexOf(direction)]

			/**
			 * when tanks are crushing straight into the block, we can do some
			 * compatible work to make it easier to pass an alley
			 */

			if(offsetX < 2) tank.offsetX = 0
			else if(offsetX > 6){
				tank.posX ++
				tank.offsetX = 0
			}

			if(offsetY < 2) tank.offsetY = 0
			else if(offsetY > 6){
				tank.posY ++
				tank.offsetY = 0
			}

			this.c.drawImage(
				dummy._getRotateBlock(tankName,d),
				posX * this.step + offsetX,
				posY * this.step + offsetY,
				this.len, this.len
			)
			return
		}
		switch (true){
			case direction == 'w':
				if(offsetY < 0){
					tank.posY --
					tank.offsetY = 7.9
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
				if(offsetX < 0){
					tank.posX --
					tank.offsetX = 7.9
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
			dummy._getRotateBlock(tankName,degree),
			tank.posX * this.step + tank.offsetX,
			tank.posY * this.step + tank.offsetY,
			this.len, this.len
		)
	}
	updateFire(fireC){
		if(fireC.fireArr.length === 0) return
		//TIP: to make sure there is least calculation, the code is redundant

		this.c.fillStyle = "#000"
		for(let fire of fireC.fireArr){
			let { direction, speed, size } = fire
			speed = speed / 5
			switch (direction){
				case "w":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyY -= speed
					break
				case "s":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyY += speed
					break
				case "a":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyX -= speed
					break
				case "d":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyX += speed
					break
				default:
					throw Error("WRONG DIRECTION")
			}
		}
	}
	fireOnBlock(fire, col, row){
		const { accuracyX, accuracyY } = fire
		let	img = ImageManager.getBitMap('blast7')
		img && this.c.drawImage(img, accuracyX - 2, accuracyY - 2, 6, 6)
		if(col !== undefined){
			this.destroyBlock(col,row)
		}
	}
	destroyBlock(col, row){
		this.alley[row][col] = 1
		this.material[row][col] = 0
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

export class EditorGrid extends Grid{
	constructor(...props){
		super(...props)

		this.activePicker = null
		this.key_down = false
		this.coveredArea = []

		//init the toolBar picker
	}
	init(map, canvas){
		super.init()
		window.document.addEventListener("resize",()=>{
			this.startPicker()
		})
		this.map = map
		this.partner = canvas
		this.startPicker()
	}
	drawBorder(){
		let w = this.step * this.map.width + 4,
			h = this.step * this.map.height + 4,
			x = (this.width - w) / 2 - 2,
			y = (this.height - h) / 2 - 2
		this.c.strokeStyle = "#ccc"
		this.c.lineWidth = 4
		this.c.strokeRect(x,y,w,h)
		window.p = this
		this.oX = x + 2
		this.oY = y + 2
		this.partner.setOffset(this.oX,this.oY)
	}
	drawLine(){
		/**
		 * there are three ways to draw a grid:
		 *  1.draw a single path or a few paths to constrain usage of CANVAS API
		 *  2.draw several rectangles to keep balance
		 *  3.draw a giant count of lines
		 *
		 *  TODO:check which method perform the best
		 *
		 * solution:
		 *  1.not yet
		 *  2.since each border of a rectangle is at least 2px, give up
		 *  3.may be the most effective API
		 */

		let w = this.step * this.map.width + 4,
			h = this.step * this.map.height + 4,
			x = (this.width - w) / 2,
			y = (this.height - h) / 2

		this.c.strokeStyle = "#333"
		this.c.lineWidth = 1

		for(let row = 0;row < this.map.width;row += 2){
			this.c.moveTo(x+row*this.step+0.5,y)
			this.c.lineTo(x+row*this.step+0.5,h+y-4)
		}
		for(let col = 0;col < this.map.height;col += 2){
			this.c.moveTo(x,y+col*this.step+0.5,)
			this.c.lineTo(w+x-4,y+col*this.step+0.5,)
		}
		this.c.stroke()
	}
	drawArea(){
		let { partner: {endCol, endRow, sX, sY}} = this

		if(sX === endCol && sY === endRow){
			this._drawBlock(endRow,endCol,EditorGrid.MAPPER[this.activePicker])
			return
		}

		//exchange the order of the numbers
		if(sX > endCol) {let temp = sX;sX = endCol;endCol = temp}
		if(sY > endRow) {let temp = sY;sY = endRow;endRow = temp}

		for(let i = sX;i < endCol;i ++){
			for(let j = sY;j < endRow;j ++){
				this._drawBlock(j,i,EditorGrid.MAPPER[this.activePicker])
			}
		}

		this.partner.clearSelection()
	}
	drawToolBar(){
		EditorGrid.PICKER.map(item=>{
			this._drawGiantBlock.apply(this,item)
		})
	}
	startPicker(){
		let { map, width, height, step, ele: { offsetLeft, offsetTop } } = this
		offsetLeft = offsetLeft + this.ele.parentNode.offsetLeft
		offsetTop = offsetTop + this.ele.parentNode.offsetTop
		let listen = this.partner.ele.addEventListener
		listen("mousemove",e=>{
			let dX = e.x - offsetLeft - (width - step * map.width) / 2,
				dY = e.y - offsetTop - (height - step * map.height) / 2
			//press down a key
			if(this.key_down === true){
				//in the range of a grid
				if(dX >= 0 && dX < map.width * step
				&& dY >= 0 && dY < map.height * step){
					let col = (dX / step) >>> 0,
						row = (dY / step) >>> 0
					this.partner.drawSelection(col,row)
				}
			}
		})

		listen("mouseup",e=>{
			this.drawArea()
			this.key_down = false
			e.preventDefault()
		})

		listen("click",e=>{
			let x = e.x - offsetLeft,
				y = e.y - offsetTop

			//choose a picker to build
			EditorGrid.PICKER.map((item)=>{
				if((item[0] - 1) * step < x && (item[0] + 3) * step > x){
					if((item[1] - 1) * step < y && (item[1] + 3) * step > y){
						this.activePicker = item[2]
					}
				}
			})
		})

		listen("mousedown",e=>{
			let dX = e.x - offsetLeft - (width - step * map.width) / 2,
				dY = e.y - offsetTop - (height - step * map.height) / 2

			this.key_down = true
			let col = (dX / step) >>> 0,
				row = (dY / step) >>> 0
			this.partner.startSelection(col,row)

			e.preventDefault()
		})
	}
	static get PICKER(){
		return [
			[4,10,"base"],
			[4,20,"p1tankU"],
			[4,30,"p2tankF"],
			[4,40,"enemy1"],
			[94,10,"steels"],
			[94,20,"grass"],
			[94,30,"water"],
			[94,40,"walls"],
		]
	}
	static get MAPPER(){
		return {
			steels: "stee",
			grass: "gra",
			water: "wate",
			walls: "wall"
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
		}

		super._drawGiantBlock(0,0,type,this)

		this.c.restore()
		return this.ele
	}
}

export default class Map extends Grid{
	constructor(...props){
		super(...props)
		this.width = props[0]
		this.height = props[1]
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