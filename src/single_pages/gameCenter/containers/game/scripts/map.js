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
 *
 */

/**
 * construction types:
 *  'v' - void area
 *  'b' - complete block
 *  'hbX' - half block, X represents an clockwise orientation(t,r,l,b)
 *  'g' - grass
 *  'w' - water
 *  'i' - irony block
 *  'hiX' - half irony block, X is the same as 'hbX'
 *
 *
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

export class Store{
	constructor(){
		this.type = 'audio'
	}

}



/**
 *
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
	}
	init(){
		this.c.clearRect(0,0,this.width,this.height)
		this.c.fillStyle = "#000"
		this.c.fillRect(0,0,this.width,this.height)
	}
	drawConstruction(map){
		const mapSourceList = map.getMapList(),
			{
				size: { width, height},
				startPos,enemies,material
			} = mapSourceList[0]

		for(let row = 0;row < height;row ++){

			for(let col = 0;col < width;col ++){

			}
		}

		const blockWidth = this.step*this.gridBlock
		const image = new Image()
		image.src = ImageManager.getBitMap("steel")
		this.c.drawImage(image,0,0,blockWidth,blockWidth)
	}
}

export default class Map extends Grid{
	constructor(width, height){
		super(width, height)
		this.width = width
		this.height =height
	}
	//init the map
	init(){

	}
	draw(){

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
