const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var total = 0;
    blogs.forEach(blog => total += blog.likes)
    return total
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    var max = blogs[0].likes
    var index = 0
    blogs.forEach((blog,i) => {
        if(blog.likes > max){
            max = blog.likes
            index = i
        }
    })
    return { 
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes,
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null
    var mapOfNumberOfBlogs = {}
    blogs.forEach(blog => {
        if(!(Object.keys(mapOfNumberOfBlogs).includes(blog.author))){
           mapOfNumberOfBlogs[blog.author] = 1
        } else {
            mapOfNumberOfBlogs[blog.author] += 1
        }
    })
    
    let maxBlogs = mapOfNumberOfBlogs[blogs[0].author]
    let authorWithMostBlogs = blogs[0].author
    for(var key of Object.keys(mapOfNumberOfBlogs)){
        if(mapOfNumberOfBlogs[key] > maxBlogs){
            maxBlogs = mapOfNumberOfBlogs[key]
            authorWithMostBlogs = key
        }
    }

    return { 
        author: authorWithMostBlogs, 
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null
    var mapOfLikes = {}
    blogs.forEach(blog => {
        if(!Object.keys(mapOfLikes).includes(blog.author)) {
            mapOfLikes[blog.author] = blog.likes
        } else {
            mapOfLikes[blog.author] += blog.likes
        }
    })

    let authorWithMostLikes = blogs[0].author
    let maxLikes = blogs[0].likes 
    for(var key of Object.keys(mapOfLikes)){
        if(mapOfLikes[key] > maxLikes){
            maxLikes = mapOfLikes[key]
            authorWithMostLikes = key
        }
    }

    return { 
        author: authorWithMostLikes, 
        likes: maxLikes 
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}