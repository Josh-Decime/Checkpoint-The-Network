


export class Sponsor {
    constructor(data) {
        this.id = data.id || data._id
        this.title = data.title
        this.linkURL = data.linkURL
        this.tall = data.tall
        this.square = data.square
        this.banner = data.banner
    }
}