export class Profile {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.graduated = data.graduated
        this.class = data.class
        this.github = data.github
        this.linkedin = data.linkedin
        this.coverImg = data.coverImg
    }
}