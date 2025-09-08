import { MessageCircle, ThumbsUpIcon } from 'lucide-react'


const PopularBlogs = () => {
const blogs = [
 {
    title:"My Awesome Blog Post",
    author:"John Doe",
    likes:100,
    comments:5
  },
  {
    title:"My Second Awesome Blog Post",
    author:"Jane Div",
    likes:140,
    comments:53,
  },
  {
    title:"Simple Blog Post",
    author:"abbey",
    likes:134,
    comments:25
  },
]
 
  return (
    <div className='bg-white p-5 2-[23rem] mt-4 border ml-5 rounded'>
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>

      {blogs.map((blog, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-bold">{blog.title}</h3>
          <p className="text-gray-600">Publish by  {blog.author}</p>
          <div className="flex items-center mt-2">
          <MessageCircle size={16} />
          <span className="text-gray-600"> {blog.likes}</span>
          <ThumbsUpIcon size={16} className="ml-2" />
          <span className="text-gray-600"> {blog.likes}</span>
          </div>
          
        </div>
      ))}
      
    </div>
  )
}

export default PopularBlogs
