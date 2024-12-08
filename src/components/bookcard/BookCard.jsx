import axios from "axios";
import { useNavigate } from "react-router-dom";


const BookCard = ({ items, fav }) => {
    const navigate = useNavigate();
  // console.log(items);
  const headers = {
    id : localStorage.getItem("id"),
    bookid : items._id,
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }

  const handleRemoveBook = async() => {
    const data = await axios.put("https://booklibrarybackend-9e8y.onrender.com/api/remove-book",{},{headers});
      console.log(data);
        alert(data.data.message);
  }
  return (
   <div className="bg-zinc-800 rounded p-4 flex flex-col h-full justify-between">
      <div onClick={() => navigate(`/view-book-details/${items._id}`)} >
          <div className="bg-zinc-900 flex items-center justify-center">
              <img className="h-[50vh]" src={items.url}  />
          </div>
        <h2 className="font-semibold mt-4 text-white text-xl">{items.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {items.author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹{items.price}</p>
      
      </div>
      
      {
        fav && <button onClick={handleRemoveBook} className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4">Remove from favourites</button>
      }
      
   </div>
  )
}

export default BookCard