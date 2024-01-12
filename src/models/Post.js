

export class Post {
    constructor(data) {
        this.id = data.id | data._id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.likes = data.likes
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }

}