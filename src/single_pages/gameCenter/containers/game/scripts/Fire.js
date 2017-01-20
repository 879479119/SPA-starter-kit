/**
 * Created by zi on 2017/1/20.
 */
export default class Fire{

	constructor(...props) {
		this.speed = 2
		this.type = 'ball'
	}

}

export class PLayerFire extends Fire{

	constructor(...props) {
		super(...props)
	}
}