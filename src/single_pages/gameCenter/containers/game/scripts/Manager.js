/**
 * Created by zi on 2017/1/15.
 */

let requireContext = require.context("../assets/image/",true,/^\.\/.*\.gif$/)
const allGif = requireContext.keys().map(requireContext)

class Manager{
	constructor(){

	}
}

export class AudioManager extends Manager{
	constructor(id){
		super(id)
		this.audioEle = window.document.querySelector("#"+id)
		//noinspection JSUnresolvedVariable
		const AudioContext = window.AudioContext || window.webkitAudioContext
		let context = new AudioContext()


	}
}

export class ImageManager extends Manager{
	constructor(props){
		super(props)

	}

	static getBitMap(file){
		let image = new Image()
		let i = 0, found = 0
		requireContext.keys().map((key)=>{
			let name = key.match(/\.\/(.*?)\.gif/)[1]
			if(name === file) found = 1
			if(found === 0)i ++
		})
		if(allGif[i] === undefined) return
		image.src = allGif[i]
		return image
	}

}

/*
 image source map:

 "./ball.gif"
 "./ball2.gif"
 "./base.gif"
 "./blast1.gif"
 "./blast2.gif"
 "./blast3.gif"
 "./blast4.gif"
 "./blast5.gif"
 "./blast6.gif"
 "./blast7.gif"
 "./blast8.gif"
 "./bomb.gif"
 "./born1.gif"
 "./born2.gif"
 "./born3.gif"
 "./born4.gif"
 "./destory.gif"
 "./enemy1.gif"
 "./enemy2.gif"
 "./enemy3.gif"
 "./enemy32.gif"
 "./enemy33.gif"
 "./enemy34.gif"
 "./grass.gif"
 "./over.gif"
 "./p1tankU.gif"
 "./p2tankF.gif"
 "./selecttank.gif"
 "./star.gif"
 "./steel.gif"
 "./steels.gif
 "./timer.gif"
 "./wall.gif"
 "./walls.gif"
 "./water.gif"
 */