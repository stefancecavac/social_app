

const PostCard = ({ post }) => {


    return (
        <div className="bg-white rounded-3xl flex flex-col p-5 shadow-md w-5/6 ">
            <div className="flex gap-2 items-center mb-5">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full ">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <p className="">User INfo</p>
            </div>

            <p className="mb-5">{post.content}</p>

            <div className="flex flex-col items-center">
                <img alt="image" src="/images.jpg" className="object-contain rounded-3xl w-full"></img>
            </div>

            <div className="flex justify-evenly mt-5">
                <p>132Likes</p>
                <p>12Comments</p>
                <p>Share</p>
            </div>
        </div>
    )
}

export default PostCard